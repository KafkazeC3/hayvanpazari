import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.id) {
    return res.status(401).json({ error: 'Giriş yapmalısınız' });
  }

  try {
    if (method === 'GET') {
      const { userId: otherUserId, listingId } = req.query;

      if (otherUserId) {
        // İki kullanıcı arasındaki mesajları getir
        const messages = await prisma.message.findMany({
          where: {
            OR: [
              { senderId: session.user.id, receiverId: otherUserId as string },
              { senderId: otherUserId as string, receiverId: session.user.id },
            ],
            ...(listingId && { listingId: listingId as string }),
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
            senderId: otherUserId as string,
            receiverId: session.user.id,
            isRead: false,
          },
          data: { isRead: true },
        });

        return res.status(200).json({ messages });
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

      return res.status(200).json({ conversations });
    } else if (method === 'POST') {
      const { receiverId, listingId, content } = req.body;

      if (!receiverId || !content?.trim()) {
        return res.status(400).json({ error: 'Eksik bilgi' });
      }

      // Kendine mesaj göndermeyi engelle
      if (receiverId === session.user.id) {
        return res.status(400).json({ error: 'Kendinize mesaj gönderemezsiniz' });
      }

      // Alıcı kontrolü
      const receiver = await prisma.user.findUnique({
        where: { id: receiverId },
      });

      if (!receiver) {
        return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
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

      return res.status(201).json({ success: true, message });
    } else if (method === 'PATCH') {
      const unreadCount = await prisma.message.count({
        where: {
          receiverId: session.user.id,
          isRead: false,
        },
      });

      return res.status(200).json({ unreadCount });
    } else {
      res.setHeader('Allow', ['GET', 'POST', 'PATCH']);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('Messages error:', error);
    return res.status(500).json({ error: 'Bir hata oluştu' });
  }
}
