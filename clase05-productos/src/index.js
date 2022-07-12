import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Para el ejercicio 01 necesitamos la 
// biblioteca «Axios», para ello la instalamos
// con: «npm install axios» y veremos que la
// dependencia es agregada a «package.json».

// Cargamos la biblioteca de Axios
import axios from 'axios';
// Ahora se puede usar por ejemplo:
//    axios.get(...)

// Ejercicio 01
//    En este mismo archivo, reemplazar
//    el componente <App />, por diferentes
//    elementos necesarios para poder mostrar
//    información básica que provenga de
//    "dummyjson", en particular queremos
//    hacer una lista de «quotes».
//
//    Para ello usamos lo que ya conocemos
//    de componentes con estado. Podemos
//    "replicar" la parte de las fotos
//    de proyectos anteriores.

//function Quote(props) {
const Quote = (props) => {
  return(
    <div className="quote" id={props.id}>
      <h3>{props.quote}</h3>
      <p><i>{props.author}</i></p>
    </div>
  );
}

const ListaQuotes = (props) => {
  return(
    <ul className="row">
      {
        props.items == null
          ? <h4>No hay frases :(</h4>
          : props.items.map(
            (item) => (
              <li key={item.id}>
                <Quote 
                  id={item.id}
                  quote={item.quote}
                  author={item.author}
                />
              </li>
            )
          )
      }
    </ul>
  );
}

class AppC extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wsQuotes: null
    }
  }

  getItems(nitems=10) {
    axios.get('https://dummyjson.com/quotes')
      .then(
        (resp) => {
          this.setState({
            wsQuotes: resp.data.quotes
          });
        }
      )
      .catch(
        (error) => {
          console.log(`Error en petición WS: ${error}`);
        }
      )
  }

  render() {
    return(
      <>
      <button onClick={() => this.getItems()}>
        Recargar frases
      </button>
      <h1>Lista de frases disponibles</h1>
      <ListaQuotes items={this.state.wsQuotes} />
      </>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppC />
  </React.StrictMode>
);

reportWebVitals(console.log);
