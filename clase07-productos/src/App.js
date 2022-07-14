// Podemos utilizar SASS en un proyecto de
// React simplemente usando archivos con
// extensión «scss» e instalando en el
// proyecto el paquete sass:
//    npm install sass
import './App.scss';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './pages/Layout';
import E404 from './pages/E404';
import Home from './pages/Home';
import Login from './pages/Login';

// Ejercicio 01:
//    - Generar los siguientes componentes
//      de React, cada uno en su respectivo
//      archivo:
//      - Layout: menú con las siguientes
//        entradas:
//        - Producto(s), Usuario, Login.
//      - Login
//      - 404
//      - SearchBox

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />

          <Route path='login' element={<Login />} />

          <Route path='*' element={<E404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
