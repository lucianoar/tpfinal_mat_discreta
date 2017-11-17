import Home from './Components/Home.js';
import CribaEratostenes from './Components/CribaEratostenes/ControllerCriba.js';
import MCD from './Components/MCD/MCD.js';
import CambioBase from './Components/CambioBase/CambioBase.js';
import Conteo from './Components/Conteo/Conteo.js';
import SumaBinario from './Components/SumaBinario/SumaBinario.js';
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
    subtitle: 'Busqueda de números primos',
    component: CribaEratostenes,
    exercise: true,
    snippet: true,
  },
  {
    path: '/mcd',
    name: 'mcd',
    title: 'Máximo común divisor',
    subtitle:
      'Busqueda del máximo divisor de 2 números usando el algoritmo de Euclides',
    component: MCD,
    exercise: true,
    snippet: true,
  },
  {
    path: '/suma_binario',
    name: 'suma_binario',
    title: 'Suma binaria',
    subtitle: 'Suma de 2 números binarios',
    component: SumaBinario,
    exercise: true,
    snippet: true,
  },
  {
    path: '/cambio_base',
    name: 'cambio_base',
    title: 'Cambio de base',
    subtitle: 'Decimal → Octal y hexadecimal',
    component: CambioBase,
    exercise: true,
    snippet: true,
  },
  {
    path: '/conteo',
    name: 'conteo',
    title: 'Conteo',
    subtitle: 'Permutaciones, combinaciones, variaciones',
    component: Conteo,
    exercise: true,
  },
];

export default Routes;
