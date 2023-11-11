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

import { ROUTER_PATH } from './constant';

const ROUTER = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />} errorElement={<NotFoundPage />}>
      <Route path={ROUTER_PATH.HOME} element={<HomePage />} />
      <Route path={ROUTER_PATH.CONTACT} element={<ContactPage />} />
      <Route path={ROUTER_PATH.NEWS} element={<NewsPage />} />
      <Route path={ROUTER_PATH.TEAM} element={<TeamPage />} />
      <Route path={ROUTER_PATH.SIGN_UP} element={<SignUpPage />} />
      <Route path={ROUTER_PATH.SIGN_IN} element={<SignInPage />} />
      <Route path={ROUTER_PATH.ACTIVATE} element={<ActivatePage />} />
    </Route>
  )
);

export default function Router(): ReactElement {
  return <RouterProvider router={ROUTER} />;
}
