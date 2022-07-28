import axios from 'axios';

import { useSelector } from 'react-redux';

// Exportamos el objeto devuelto por
// axios.create que nos servirá de base
// para poder hacer las peticiones al WS
// sin necesidad de repetir la URL base,
// ni tampoco insertar siempre los
// headers de Content-Type.
export default axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

axios.interceptors.request.use(
  req => {
    // Si la url no incluye la cadena "add"
    // entonces no se cambia nada de 
    // la petición.
    if( !req.url.includes('add') ) {
      return req;
    }

    // Para agregar el toke de autenticación
    // a las demás peticiones, las obtenemos
    // del estado
    const auth = useSelector(
      (state) => state.auth
    );

    // Modificamos los headers
    req.headers['Authorization'] = `Bearer ${auth.token}`;

    return req;
  }
);