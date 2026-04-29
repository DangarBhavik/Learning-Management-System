import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import getUser from './lib/getUser';

// const isProtectedRoute = createRouteMatcher(['/app(.*)']);
const isPublicRoutes = createRouteMatcher([
  '/',
  '/auth/signin',
  '/auth/signup',
  '/api/webhooks(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (!userId && !isPublicRoutes(req)) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  // const user = await getUser({ userId });
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    // '/(api|trpc)(.*)',
  ],
};
