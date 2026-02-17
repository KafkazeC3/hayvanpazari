import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth/options';

export const dynamic = 'force-dynamic';

export default NextAuth(authOptions);
