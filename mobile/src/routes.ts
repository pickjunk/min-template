import { routes } from '@pickjunk/min';

export default routes({
  notFound: {
    name: '404',
  },
  data: {
    component: './layouts/app',
    children: [
      {
        component: './layouts/nav',
        children: [
          {
            path: '/',
            name: 'home',
            component: './pages/home',
          },
          {
            path: '/my',
            name: 'my',
            component: './pages/my',
          },
        ],
      },
      {
        path: '/back',
        name: 'back',
        component: './pages/back',
      },
      {
        path: '/404',
        name: '404',
        component: './pages/404',
      },
    ],
  },
});
