import { type ReactElement } from 'react';
import InternalServerError from '@Pages/Error/InternalServerError';
import Router from './Router';
import ErrorBoundary from './ErrorBoundary';

export default function App(): ReactElement {
  return (
    <ErrorBoundary fallback={<InternalServerError />}>
      <Router />
    </ErrorBoundary>
  );
}
