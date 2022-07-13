// Del módulo «react» cargamos a «useState»
// que es un hook que nos permite hacer uso
// de estados en un componente creado a
// partir de una función, en lugar de
// una clase.
import { useState } from 'react';

import axios from 'axios';

const Producto = (props) => {
  return(
    <li>{props.title}</li>
  );
}

const Productos = () => {
  // Generamos una constante o variable
  // donde guardaremos la lista de productos.
  // Comentamos la variable cuando hacemos
  // uso de «useState»
  //let productos = null;

  // Indicamos que deseamos usar el hook de
  // React llamado «useState» y lo 
  // «descomponemos» (destructuring) en dos
  // elementos, uno será el «getter» y otro el
  // «setter». Es decir, uno servirá para
  // obtener el valor del estado y otro para
  // establecer su valor.

  // Se puede pasar el valor inicial de la 
  // «variable» de estado como argumento
  // de «useState»:
  // useState(val_inicial)
  const [productos,setProductos] = useState();

  // Generamos una función dentro de esta
  // función flecha que representa a un
  // componente de React.
  // Lo anterior es posible porque una función
  // puede ser "almacenada" en una "variable"
  // o en una "constante" en JS.

  const cargaProductos = () => {
    axios.get('https://dummyjson.com/products')
      .then(
        (resp) => {
          console.log(`[${new Date()}]: ${JSON.stringify(resp.data)}`);

          // Ya tenemos los datos de los
          // productos y queremos guardarlos
          // en la variable productos y que
          // además se "repinte" este
          // componente (Productos).

          // Usamos el «setter» de la variable
          // de estado «productos» para poder
          // asignarle su valor. De manera
          // automática, React pintará lo que
          // sea neceario actualizar en la
          // vista de nuestra aplicación.
          setProductos(resp.data.products)

          // De manera intuitiva, lo que hace
          // setProductos es:
          // 1.- productos = resp.data.products
          // 2.- «repinta lo necesario»
        }
      )
      .catch(
        (error) => {
          console.log(`[${new Date()}]: ${error}`);
        }
      );
  }

  return(
    <ul>
      {
        productos == null
          ? <>
            <h3>No hay produtos</h3>
            <button onClick={cargaProductos}>
              Carga productos
            </button>
            </>
          : productos.map(
            (prod,idx) => <Producto 
              key={idx}
              title={prod.title}
              />
          )
      }
    </ul>
  );
}


// Ejercicio 01:
//
//    - Convertir el componente «App» a una
//      función flecha.
//    - Tomar los componentes «Productos» y
//      «Producto» y extraerlos a un archivo
//      propio para cada uno de ellos.
//    - Verificar que los «imports» estén
//      en los archivos que corresponden
//      únicamente.

//      **** Hora de término: 20:35hrs

function App() {
  return(
    <>
    <h1>Productos</h1>
    <Productos />
    </>
  );
}

export default App;