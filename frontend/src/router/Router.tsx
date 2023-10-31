import {
  RouterProvider,
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';

import { Layout } from '@Layout/Layout';
import HomePage from '@Pages/Home/HomePage';
import ContactPage from '@Pages/Contact/ContactPage';
import NewsPage from '@Pages/News/NewsPage';

import { ROUTES } from './routes.enum';

const ROUTER = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />} errorElement={<div>Error</div>}>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.CONTCT} element={<ContactPage />} />
      <Route path={ROUTES.NEWS} element={<NewsPage />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={ROUTER} />;
}
