import { useSelector } from 'react-redux';

import Todo from './Todo';

const Todos = () => {
  // Para obtener el estado de Redux, lo
  // hacemos a traves de un selector, que
  // en realidad es un hook personalizado
  // creado por Redux.
  const todos = useSelector(
    (state) => state.todos
  );

  console.log(`TODOS: ${JSON.stringify(todos)}`);

  return(
    <ul>
      {
        todos.map(
          (todo) => (
            <li key={todo.id}>
              <Todo todo={todo} />
            </li>
          )
        )
      }
    </ul>
  );
}

export default Todos;