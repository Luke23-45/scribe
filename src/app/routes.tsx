import { 
  Outlet, 
  createRouter, 
  createRoute, 
  createRootRoute, 
} from '@tanstack/react-router';

// Imports using your new @ alias
import { Layout } from '@/app/Layout'; // Or relative path if preferred
import { SanctuaryPage } from '@/pages/sanctuary/SanctuaryPage';
import { LibraryPage } from '@/pages/library/LibraryPage';
import { FocusPage } from '@/pages/focus/FocusPage'; // <--- Ensure FocusPage is imported
import { TranscriptionPage } from '@/pages/transcription/TranscriptionPage';
// 1. ROOT
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});


// 2. Define
const transcriptionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/transcription', // New specialized path
  component: TranscriptionPage,
});
// 2. PAGES
const sanctuaryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: SanctuaryPage,
});

const libraryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/library',
  component: LibraryPage,
});

// !!! THE CRITICAL FIX !!! 
// Ensure this path is '/session', NOT '/focus'
const sessionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/session',  // <--- This must match navigate({ to: '/session' })
  component: FocusPage,
});

// 3. TREE
const routeTree = rootRoute.addChildren([
  sanctuaryRoute,
  libraryRoute,
  sessionRoute, 
  transcriptionRoute, 
]);

// 4. INSTANCE
export const router = createRouter({ 
  routeTree,
  defaultPreload: 'intent',
});

// 5. TYPES
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}