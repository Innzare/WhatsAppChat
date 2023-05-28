import { LoginPage } from 'Src/views/LoginPage';
import { HomePage } from 'Src/views/HomePage';
import { ROUTE_PATHS } from 'Src/consts/routes';

export const ROUTES = [
  {
    path: ROUTE_PATHS.HOME,
    index: false,
    component: HomePage
  },
  {
    path: ROUTE_PATHS.LOGIN,
    index: false,
    component: LoginPage
  }
];
