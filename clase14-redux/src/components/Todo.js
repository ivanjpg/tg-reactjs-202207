const Todo = (props) => {
  console.log(`Todo prop: ${JSON.stringify(props)}`);

  return(
    props.todo.texto
  );
}

export default Todo;