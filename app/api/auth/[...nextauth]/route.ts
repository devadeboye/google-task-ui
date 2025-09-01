import NextAuth from '@/lib/auth/nextauth';

const handler = NextAuth;

export { handler as GET, handler as POST };
