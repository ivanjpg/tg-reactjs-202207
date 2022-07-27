import './App.css';

import Todos from './components/Todos';
import AgregarTodo from './components/AgregarTodo';

function App() {
  return (
    <div className="App">
      <AgregarTodo />
      <Todos />
    </div>
  );
}

export default App;
