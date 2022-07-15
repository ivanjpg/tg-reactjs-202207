import {useState, useEffect} from 'react';

import axios from "axios";

import SearchBox from '../SearchBox';

const Productos = () => {
  // Inicializamos el estado para la
  // lista de productos
  const [productos,setProductos] = useState([]);

  // Generamos una función que obtenga la
  // lista de productos desde el WS
  const getProductos = async () => {
    let resp;

    try {
      resp = await axios.get('https://dummyjson.com/products');
    } catch(error) {
      console.log(`getProdError: ${error}`);
      return;
    }

    console.log(`***RESP: ${JSON.stringify(resp)}`);

    setProductos(resp.data.products);
  }

  // Definimos la función de búsqueda
  // de productos
  const hazBusqueda = (ev) => {
    // Obtenemos el texto del input y lo
    // convertimos a minúsculas.
    let val = ev.target.value.toLowerCase();

    console.log(`Buscar: ${val}`);

    // Filter espera que se le devuelva un
    // valor boleano.
    // Verdadero: conserva el elemento.
    // Falso: descarta el elemento.
    let res = productos.filter(
      (prod) => {
        // Obtenemos el título del producto
        // y lo convertimos a minúsculas.
        let titulo = prod.title.toLowerCase();

        // Dentro del título del producto
        // buscamos la cadena «val», que es lo
        // el usuario está solicitando.
        // Usamos el método «search()» que
        // devuelve la posición de la cadena
        // buscada, dentro de la original.
        // Si el valor es <0, entonces, 
        // la cadena no se encontró
        return titulo.search(val) >= 0;
      }
    );

    console.log(`Resultado búsqueda: ${JSON.stringify(res)}`);
  }

  // Queremos que los productos se carguen
  // solos, sin tener que oprimir el botón,
  // entonces utilizamos un nuevo Hook,
  // llamado «useEffect». Este se ejecuta
  // DESPUÉS de que el componente es
  // "rendereado".

  // Si las acciones ejecutadas por
  // «useEffect» causan un rendering, entonces
  // se volverá a ejecutar «useEffect».
  // Para evitarlo debemos establecer 
  // ciertas condiciones (dependencias)
  // como segundo argumento del hook.
  
  // Si las dependencias cambian, entonces
  // se vuelve a ejecutar «useEffect»
  // Si las depencias NO cambian, el hook
  // no se ejecutará.
  useEffect(() => {
    getProductos();
  }, []);

  return(
    <>
    <h3>Productos disponibles</h3>
    <button onClick={getProductos}>
      Obtener productos
    </button>

    <br />
    {/* <SearchBox /> */}
    <input 
      onChange={hazBusqueda}
      type="text"
      placeholder="Buscar" />

    <ul>
      {
        productos == null || productos.length < 1
        ? <h3>No hay productos :(</h3>
        : productos.map(
          (prod) => {
            return(
              <li key={prod.id}>
                {prod.title}
              </li>
            );
          }
        )
      }
    </ul>
    </>
  );
}

export default Productos;