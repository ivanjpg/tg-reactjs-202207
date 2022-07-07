// Creamos un componente que genere UNA foto
function Foto(props) {
  return (
    <div className="imagen">
      <img src={props.info.imagenURL} alt="" />
      <h3>{props.info.titulo}</h3>
    </div>
  );
}

// Creamos un componente que genere la lista de fotos
function ListaFotos(props) {
  return (
    <ul className="row">
      {/*
        En este caso esperamos que dentro de «props» nos proporcionen
        la lista de fotos o la información de las fotos en la propiedad
        llamada «items» (props.items).

        Si se da el caso de que «props.items» está vacío o no es
        un arreglo de JS, al tratar de ejecutar «map()» obtendremos
        un error.
        Para solucionarlo usamos lo que se llama un
        «rendering condicional»

        La generación de los elementos de la lista, se hará usando
        "listas" de React.
      */}
      {
        // Podemos usar un operador ternario para verificar si
        // podemos pintar lo que deseamos.
        props.items == null
          ? <h4>No hay fotos :(</h4>
          : props.items.map(
          (item) => (
            <li className="col-sm-12 col-md-3" key={item.id} id={item.id}>
              <Foto info={item} />
            </li>  
          )
        )
      }
    </ul>
  );
}


// Creamos un componente App, que en un inicio contiene a TODO lo que
// queremos pasar a React. Se irá modificando cuando vayamos
// extrayendo las diferentes partes que lo componen.
function App() {
  // Definimos una lista de fotos provisional «hardcodeada» para poder
  // probar nuestros componentes. Después será sustituida por
  // alguna otra fuente de datos.
  const fotos = [
    {
      id: 1,
      titulo: 'Duis officia amet dolor tempor ea aliquip.',
      imagenURL: 'https://picsum.photos/200/300?random=1'
    },
    {
      id: 2,
      titulo: 'Pariatur ipsum quis incididunt velit adipisicing nostrud in adipisicing culpa non officia.',
      imagenURL: 'https://picsum.photos/200/300?random=2'
    },
    {
      id: 3,
      titulo: 'Magna cupidatat nulla enim voluptate.',
      imagenURL: 'https://picsum.photos/200/300?random=3'
    },
    {
      id: 4,
      titulo: 'Lorem duis enim quis ea velit ex.',
      imagenURL: 'https://picsum.photos/200/300?random=4'
    }
  ];

  return (
    <div>
      <h1>R: Lista de imágenes disponibles</h1>
      <div className="lista-imagenes">
        <ListaFotos items={fotos} />
      </div>
    </div>
  );
}

// Generamos un «root» de React
const root = ReactDOM.createRoot(
  document.getElementById('root')
);

// Hacemos «render» a nuestro componente App
root.render(<App />);