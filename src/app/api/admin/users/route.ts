import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { listings: true }
        }
      }
    });

    // Transform data to include listingCount
    const transformedUsers = users.map(user => ({
      ...user,
      listingCount: user._count.listings,
      _count: undefined
    }));

    return NextResponse.json({ users: transformedUsers });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
