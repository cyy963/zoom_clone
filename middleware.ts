import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const protectedRoutes = createRouteMatcher([
  '/',
  '/upcoming',
  '/previous',
  '/recordings',
  '/personal-room',
  '/meeting(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionId, redirectToSignIn } = await auth(); // Await the promise

  // Check if the user is signed in based on userId or sessionId
  if (protectedRoutes(req) && !userId && !sessionId) {
    return redirectToSignIn(); // Redirect to sign-in if user is not authenticated
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
