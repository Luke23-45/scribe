import React from 'react';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './routes';

export const App: React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
};