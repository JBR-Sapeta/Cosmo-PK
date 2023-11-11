import { type ReactElement } from 'react';
import Router from '@Router/Router';
import ErrorPage from '@Pages/Error/ErrorPage';
import ErrorBoundary from './ErrorBoundary';

export default function App(): ReactElement {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Router />
    </ErrorBoundary>
  );
}
