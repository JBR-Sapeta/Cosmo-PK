import { type ReactElement } from 'react';

import {
  RouterProvider,
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';

import { Layout } from '@Layout/Layout';

import HomePage from '@Pages/Home';
import ContactPage from '@Pages/Contact';
import NewsPage from '@Pages/News';
import TeamPage from '@Pages/Team/TeamPage';
import NotFoundPage from '@Pages/Error/NotFoundPage';
import { SignInPage, SignUpPage, ActivatePage } from '@Pages/Auth';

import { ROUTES } from './config';

const ROUTER = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />} errorElement={<NotFoundPage />}>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.CONTACT} element={<ContactPage />} />
      <Route path={ROUTES.NEWS} element={<NewsPage />} />
      <Route path={ROUTES.TEAM} element={<TeamPage />} />
      <Route path={ROUTES.SIGN_UP} element={<SignUpPage />} />
      <Route path={ROUTES.SIGN_IN} element={<SignInPage />} />
      <Route path={ROUTES.ACTIVATE} element={<ActivatePage />} />
    </Route>
  )
);

export default function Router(): ReactElement {
  return <RouterProvider router={ROUTER} />;
}
