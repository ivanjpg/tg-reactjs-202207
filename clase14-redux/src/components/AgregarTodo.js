import { useState } from "react";

import { useDispatch } from "react-redux";
import { agregarTodo } from '../features/todo/todoSlice';

const AgregarTodo = () => {
  // Este estado es local a este componente
  // como todos los de React.
  // En este caso nos sirve para gestionar
  // el formulario.
  const [texto, setTexto] = useState('');

  // Nos permite usar el dispatch de
  // Redux, que a su vez modificará
  // el estado global.
  const dispatch = useDispatch();

  const enviaForma = (e) => {
    // Debemos detener el evento por default
    // de un formulario HTML. Nosotros lo
    // gestionamos a través de React.
    e.preventDefault();

    // Agregamos el Todo al estado
    // del store global de Redux

    // Notemos que estamos siguiendo el
    // flujo de trabajo de Redux.
    // Un evento (click al botón del
    // formulario) lanzará al dispatcher
    // mismo que modificará el estado global
    dispatch( agregarTodo(texto) );
    setTexto('');
  }

  return(
    <form onSubmit={enviaForma}>
      <input 
        onChange={(e) => setTexto(e.target.value)}
        value={texto}
        type="text" />

      <button>Agregar Todo</button>
    </form>
  );
}

export default AgregarTodo;