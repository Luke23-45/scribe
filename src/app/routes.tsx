import {
  Outlet,
  createRouter,
  createRoute,
  createRootRoute,
} from '@tanstack/react-router';

// --- THE SHELL ---
// This handles the Navigation Bar and global Page Transitions
import { Layout } from './Layout';

// --- THE DESTINATIONS ---
import { SanctuaryPage } from '../pages/sanctuary/SanctuaryPage';
import { LibraryPage } from '../pages/library/LibraryPage';
import { FocusPage } from '../pages/focus/FocusPage';

// ---------------------------------------------------------------------------
// 1. ROOT ROUTE
// This is the constant frame of the application. 
// It wraps every page in the <Layout> component.
// ---------------------------------------------------------------------------
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

// ---------------------------------------------------------------------------
// 2. PAGE DEFINITIONS
// ---------------------------------------------------------------------------

// A. The Sanctuary (Home) - Path: "/"
const sanctuaryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: SanctuaryPage,
});

// B. The Library (Selection) - Path: "/library"
const libraryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/library',
  component: LibraryPage,
});

// C. The Focus Room (Workspace) - Path: "/focus"
const focusRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/focus',
  component: FocusPage,
});

// ---------------------------------------------------------------------------
// 3. TREE CONSTRUCTION
// ---------------------------------------------------------------------------
const routeTree = rootRoute.addChildren([
  sanctuaryRoute,
  libraryRoute,
  focusRoute,
]);

// ---------------------------------------------------------------------------
// 4. ROUTER INSTANTIATION
// ---------------------------------------------------------------------------
export const router = createRouter({
  routeTree,
  // Optional: Set default preload behavior for a faster feeling
  defaultPreload: 'intent',
});

// ---------------------------------------------------------------------------
// 5. TYPE SAFETY (Critical for TypeScript)
// This registers our routes so TS knows that "/focus" exists and "/foo" does not.
// ---------------------------------------------------------------------------
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}