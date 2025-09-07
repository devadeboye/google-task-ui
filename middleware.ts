import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // If user is authenticated and trying to access auth pages, redirect to tasks
    if (token && pathname.startsWith('/auth/')) {
      return NextResponse.redirect(new URL('/tasks', req.url));
    }

    // If user is not authenticated and trying to access protected routes
    if (!token && pathname.startsWith('/tasks/')) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        // Allow access to auth pages without token
        if (pathname.startsWith('/auth/')) {
          return true;
        }
        
        // Require token for protected routes
        if (pathname.startsWith('/tasks/')) {
          return !!token;
        }
        
        // Allow access to public routes
        return true;
      },
    },
  }
);

// Define which routes should be processed by middleware
export const config = {
  matcher: [
    // Process all routes except static files and API routes
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
