
import My from './../page/my'
import Home from './../page/home'
import System from './../page/system'
const routes = [
  {
    path: '/',
    exact: true,
    layout: 'base',
    component: Home
  },
  {
    path: '/home',
    layout: 'base',
    component: Home
  },
  {
    path: '/my',
    layout: 'base',
    component: My
  },
  {
    path: '/system',
    layout: 'base',
    component: System
  }
];

export default routes;