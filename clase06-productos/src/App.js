//import Productos from './Productos'


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

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Home';
import Layout from './Layout';
import E404 from './E404';
import Productos from './Productos';

const App = () => {
  // return(
  //   <>
  //   <h1>Productos</h1>
  //   <Productos />
  //   </>
  // );

  return(
    <BrowserRouter>
      <Routes>
        {/* 
          Al anidar rutas, lo que sucederá es
          que el render se dará en la ruta
          madre, y la anidada aparecerá donde
          encuentre un elemento especial
          llamado <Outlet />, este debe estar
          dentro del componente de la ruta
          madre.
        */}
        <Route path='/' element={<Layout />}>
          {/* 
            Al añadir el atributo «index» a una
            ruta, se mostrará por default, sin
            necesidad de navegar.
          */}
          <Route index element={<Home />} />

          <Route path='prods' element={<Productos />} />

          {/* 
            Si el atributo «path» es «*»
            entonces si ninguna ruta es
            seleccionada, caerá en este tipo 
            de «default»
          */}
          <Route path='*' element={<E404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;