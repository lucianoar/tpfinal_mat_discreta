import Home from './Components/Home.js';
const Routes = [
  {
    path: '/',
    name: 'home',
    title: 'Home',
    component: Home,
    exercise: false,
  },
  {
    path: '/criba',
    name: 'criba',
    title: 'Criba de Eratóstenes',
    component: null,
    exercise: true,
  },
  {
    path: '/mcd',
    name: 'mcd',
    title: 'Mínimo común divisor',
    component: null,
    exercise: true,
  },
  {
    path: '/cambio_base',
    name: 'cambio_base',
    title: 'Cambio de base',
    component: null,
    exercise: true,
  },
];

export default Routes;
