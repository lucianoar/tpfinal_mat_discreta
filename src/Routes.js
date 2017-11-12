import Home from './Components/Home.js';
import Criba from './Components/CribaEratostenes.js';
import MCD from './Components/MCD.js';
import CambioBase from './Components/CambioBase.js';
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
    component: Criba,
    exercise: true,
    snippet: true,
  },
  {
    path: '/mcd',
    name: 'mcd',
    title: 'Mínimo común divisor',
    component: MCD,
    exercise: true,
  },
  {
    path: '/cambio_base',
    name: 'cambio_base',
    title: 'Cambio de base',
    component: CambioBase,
    exercise: true,
  },
];

export default Routes;
