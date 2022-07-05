'use strict';

// Obtenemos el elemento de la página HTML que contendrá a
// nuestros elementos de React. Para ello usamos JS puro.
const rdiv = document.getElementById('root');

// Ahora creamos el objeto de React, que servirá
// de contenedor para «pintar» todo lo que necesitemos.
const root = ReactDOM.createRoot(rdiv);

// Generamos un elemento de React que es análogo o equivalente
// a <h1 class="saludo">¡Hola, mundo!</h1>
const elem = React.createElement(
  'h1',
  {className: 'saludo'},
  '¡Hola, mundo!'
);

// Pintemos el elemento a través de las funciones de React.
root.render(elem);

// Generemos un elemento similar al creado directamente con
// React, pero ahora usando la sintaxis JSX.
const elem2 = <h1 className="saludo">¡Hola, mundo2!</h1>;

// Podemos hacer render sobre el root que ya tenemos, pero esto
// sobreescribiría al anterior. Usamos uno distinto.
const root2 = ReactDOM.createRoot(
  document.getElementById('root2')
);
root2.render(elem2);

// Ahora veamos cómo funcionan las expresiones incrustadas dentro de
// JSX. Para esto se utilizan llaves «{}», y entre ellas cualquier
// expresión válidad de JS. El resultado de ésta última será
// sustituida dentro de las llaves.
const nombre = 'Carl Gauss';
const saluda_nombre = <h2>Hola, {nombre}</h2>;

// Obtenemos un tercer nodo root para hacer el render.
const root3 = ReactDOM.createRoot(
  document.getElementById('root3')
);
root3.render(saluda_nombre);