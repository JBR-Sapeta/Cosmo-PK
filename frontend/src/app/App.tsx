import { type ReactElement } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';

import Router from '@Router/Router';
import queryClient from '@Store/client';
import ErrorPage from '@Pages/Error/ErrorPage';
import ErrorBoundary from './ErrorBoundary';

export default function App(): ReactElement {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>
          <Router />
          <ReactQueryDevtools initialIsOpen={true} />
        </SnackbarProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
