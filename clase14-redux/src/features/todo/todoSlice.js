import { createSlice } from '@reduxjs/toolkit';

import { v4 as uuid } from 'uuid';

export const todoSlice = createSlice({
  name: 'todos',
  initialState: [{id:uuid(),texto:'default'},{id:uuid(),texto:'default'}],
  // Los reducers deben recibir 2 parámetros,
  // el primero el estado "actual" o "viejo",
  // y el segundo es la acción.
  reducers: {
    // Definimos el reductor para cuando
    // queremos crear un nuevo TODO
    agregarTodo: (state, action) => {
      const todo = {
        id: uuid(),
        // Las acciones pueden tener un tipo
        // y también un "payload" que es
        // información que servirá para
        // modificar el estado anterior o
        // dicho de otro modo, alterarlo.
        texto: action.payload
      };

      // Dentro de React no es posible o no
      // debemos alterar el estado de manera
      // directa, en otras palabras mutar
      // (mutate). Lo cual ocurre también
      // en el Redux "tradicional".
      // Pero en el caso de Redux Toolkit,
      // se usa internamente «Immer», que
      // traducido a términos simplistas
      // nos va a permitir mutar el estado
      // de manera directa haciendo más 
      // fácil el desarrollo.
      // Esto se encuentra presente de
      // manera particular dentro del método
      // «createSlice()»
      state.push(todo);

      // Otra alternativa a mutar el estado
      // de manera directa, es el usar
      // el modo tradicional de Redux, lo cual
      // se trabaja con un return:
      //return [...state, todo];
    }
  }
});

export const { agregarTodo } = todoSlice.actions;

// Para el store, debemos exportar el
// «reducer». «createSlice()» como tal, no
// devuelve la función reductora, pero sí
// podemos obtenerla a partír de ella.
export default todoSlice.reducer;