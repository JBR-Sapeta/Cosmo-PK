import { type ReactElement } from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';

import { Layout } from '@Layout/Layout';
import ProfilePage from '@Pages/Auth/ProfilePage';
import { SignInPage, SignUpPage, ActivatePage } from '@Pages/Auth';
import ContactPage from '@Pages/Contact';
import NotFoundPage from '@Pages/Error/NotFoundPage';
import HomePage from '@Pages/Home';
import NewsPage from '@Pages/Post';
import EditorPage from '@Pages/Post/EditorPage';
import TeamPage from '@Pages/Team/TeamPage';

import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

import { ROUTER_PATH } from './constant';

const ROUTER = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />} errorElement={<NotFoundPage />}>
      <Route path={ROUTER_PATH.HOME} element={<HomePage />} />
      <Route path={ROUTER_PATH.CONTACT} element={<ContactPage />} />
      <Route path={ROUTER_PATH.NEWS} element={<NewsPage />} />
      <Route path={ROUTER_PATH.TEAM} element={<TeamPage />} />
      <Route path={ROUTER_PATH.ACTIVATE} element={<ActivatePage />} />
      <Route element={<ProtectedRoute />}>
        <Route path={ROUTER_PATH.EDITOR} element={<EditorPage />} />
        <Route path={ROUTER_PATH.PROFILE} element={<ProfilePage />} />
      </Route>
      <Route element={<PublicRoute />}>
        <Route path={ROUTER_PATH.SIGN_UP} element={<SignUpPage />} />
        <Route path={ROUTER_PATH.SIGN_IN} element={<SignInPage />} />
      </Route>
    </Route>
  )
);

export default function Router(): ReactElement {
  return <RouterProvider router={ROUTER} />;
}
