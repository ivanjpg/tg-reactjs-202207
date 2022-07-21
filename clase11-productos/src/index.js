import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Ejercicio 01
//    Añadir un elemento «Usuarios» al menú
//    donde se listen los usuarios devueltos
//    por el WS. Cada uno de los usuarios
//    de la lista, debe tener 2 botones:
//      - Borrar usuario.
//      - Mostrar usuario (info extendida).
//    Además, la página «Usuarios» sólo
//    deberá ser accesible si se está
//    autenticado correctamente.
//    Para las peticiones que borran usuarios
//    debe contemplarse el uso de la 
//    autenticación mediante el token
//    correspondiente.

reportWebVitals(console.log);
