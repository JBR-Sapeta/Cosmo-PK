import { type ReactElement } from 'react';
import ErrorPage from '@Pages/Error/ErrorPage';
import Router from './Router';
import ErrorBoundary from './ErrorBoundary';

export default function App(): ReactElement {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Router />
    </ErrorBoundary>
  );
}
