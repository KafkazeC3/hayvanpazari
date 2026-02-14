import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';
import prisma from '@/lib/db';

// Mesajları getir (konuşma listesi veya tek konuşma)
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Giriş yapmalısınız' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const otherUserId = searchParams.get('userId'); // Belirli bir kullanıcıyla konuşma
    const listingId = searchParams.get('listingId'); // İlana göre filtrele

    if (otherUserId) {
      // İki kullanıcı arasındaki mesajları getir
      const messages = await prisma.message.findMany({
        where: {
          OR: [
            { senderId: session.user.id, receiverId: otherUserId },
            { senderId: otherUserId, receiverId: session.user.id },
          ],
          ...(listingId && { listingId }),
        },
        orderBy: { createdAt: 'asc' },
        include: {
          sender: { select: { id: true, name: true, avatar: true } },
          receiver: { select: { id: true, name: true, avatar: true } },
          listing: { select: { id: true, title: true, images: true } },
        },
      });

      // Okunmamış mesajları okundu olarak işaretle
      await prisma.message.updateMany({
        where: {
          senderId: otherUserId,
          receiverId: session.user.id,
          isRead: false,
        },
        data: { isRead: true },
      });

      return NextResponse.json({ messages });
    }

    // Konuşma listesini getir (son mesaja göre grupla)
    const conversations = await prisma.$queryRaw`
      SELECT 
        m.*,
        u.id as other_user_id,
        u.name as other_user_name,
        u.avatar as other_user_avatar,
        l.id as listing_id,
        l.title as listing_title,
        l.images as listing_images,
        (SELECT COUNT(*) FROM Message 
         WHERE senderId = other_user_id 
         AND receiverId = ${session.user.id} 
         AND isRead = false) as unread_count
      FROM Message m
      JOIN User u ON (u.id = m.senderId OR u.id = m.receiverId) AND u.id != ${session.user.id}
      LEFT JOIN Listing l ON l.id = m.listingId
      WHERE m.id IN (
        SELECT MAX(id) FROM Message 
        WHERE senderId = ${session.user.id} OR receiverId = ${session.user.id}
        GROUP BY 
          CASE 
            WHEN senderId = ${session.user.id} THEN receiverId 
            ELSE senderId 
          END
      )
      ORDER BY m.createdAt DESC
    `;

    return NextResponse.json({ conversations });
  } catch (error) {
    console.error('Messages fetch error:', error);
    return NextResponse.json(
      { error: 'Mesajlar getirilirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

// Yeni mesaj gönder
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Giriş yapmalısınız' }, { status: 401 });
    }

    const { receiverId, listingId, content } = await req.json();

    if (!receiverId || !content?.trim()) {
      return NextResponse.json(
        { error: 'Eksik bilgi' },
        { status: 400 }
      );
    }

    // Kendine mesaj göndermeyi engelle
    if (receiverId === session.user.id) {
      return NextResponse.json(
        { error: 'Kendinize mesaj gönderemezsiniz' },
        { status: 400 }
      );
    }

    // Alıcı kontrolü
    const receiver = await prisma.user.findUnique({
      where: { id: receiverId },
    });

    if (!receiver) {
      return NextResponse.json(
        { error: 'Kullanıcı bulunamadı' },
        { status: 404 }
      );
    }

    const message = await prisma.message.create({
      data: {
        content: content.trim(),
        senderId: session.user.id,
        receiverId,
        listingId: listingId || null,
        isRead: false,
      },
      include: {
        sender: { select: { id: true, name: true, avatar: true } },
        receiver: { select: { id: true, name: true, avatar: true } },
        listing: { select: { id: true, title: true } },
      },
    });

    return NextResponse.json({ success: true, message });
  } catch (error) {
    console.error('Message send error:', error);
    return NextResponse.json(
      { error: 'Mesaj gönderilirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

// Okunmamış mesaj sayısını getir
export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Giriş yapmalısınız' }, { status: 401 });
    }

    const unreadCount = await prisma.message.count({
      where: {
        receiverId: session.user.id,
        isRead: false,
      },
    });

    return NextResponse.json({ unreadCount });
  } catch (error) {
    console.error('Unread count error:', error);
    return NextResponse.json(
      { error: 'Bir hata oluştu' },
      { status: 500 }
    );
  }
}
