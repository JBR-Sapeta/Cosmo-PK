import { type ReactElement } from 'react';

import {
  RouterProvider,
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';

import { Layout } from '@Layout/Layout';
import NotFound from '@Pages/Error/NotFound';
import HomePage from '@Pages/Home/HomePage';
import ContactPage from '@Pages/Contact/ContactPage';
import NewsPage from '@Pages/News/NewsPage';

import { ROUTES } from './config';

const ROUTER = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />} errorElement={<NotFound />}>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.CONTCT} element={<ContactPage />} />
      <Route path={ROUTES.NEWS} element={<NewsPage />} />
    </Route>
  )
);

export default function Router(): ReactElement {
  return <RouterProvider router={ROUTER} />;
}
