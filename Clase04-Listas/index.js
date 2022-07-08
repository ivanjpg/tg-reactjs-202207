// Creamos una función que descargue datos de una API remota,
// para esto utilizamos Axios.
// Recibamos un parámetro donde se especifique el número de fotos
// o items que deseamos obtener. Por default pongamos 12.
function getItems(nitems=12) {
  // Hacemos la petición a través de Axios

  console.log(`Se solicitaron ${nitems} fotos en getItems.`);
  console.log('Antes de GET');

  // Las funciones para hacer peticiones remotas son asíncronas, al
  // igual que muchas operaciones de I/O en diversos entornos y 
  // lenguajes de programación. Con esto se evita, por ejemplo,
  // el bloqueo de la interfaz de usuario.

  // En este caso haremos uso de los «promises» de JS para dejar
  // "programado" el comportamiento para cuando el proceso termine.
  axios.get('https://jsonplaceholder.typicode.com/photos')
    .then(
      // Esta función se ejecutará automáticamente cuando «get()»
      // termine su proceso Y haya tenido éxito.
      function (resp) {
        console.log('***«get()» terminado: ¡Éxito!');

        // Podemos acceder al código de estado HTTP
        console.log(`HTTPStatusCode: ${resp.status}`);

        // Los datos recibidos como tal, es decir, la información,
        // está dada en la propiedad «data». En este caso, sabemos
        // de antemano que se trata de un arreglo, entonces podemos
        // verificar su longitud.
        console.log(`Recibimos ${resp.data.length} fotos`);

        // Por lo pronto obtendremos un número de imágenes determinado
        // ya que el webservice de ejemplo siempre regresa 5000.
        // Para obtener un pequeño conjunto definido por el parámetro
        // «nitems» usamos el método «slice()» definido para los
        // arreglos de JS.
        console.log(`Se solicitaron ${nitems} fotos en then.`);
        const fotos = resp.data.slice(0,nitems);
        console.log(`Tenemos ${fotos.length} fotos filtradas`);

        // Si en este punto hacemos un «return», en realidad estamos
        // saliendo de la función "interna" que se está ejecutando
        // en otro hilo / proceso y lo más seguro es que 
        // «getItems()» ya haya terminado de ejecutar todas sus
        // instrucciones.
        return fotos;
      }
    )
    .catch(
      // Esta función se ejecutará automáticamente cuando «get()»
      // termine su proceso Y haya tenido error.
      function (error) {
        console.log('***«get()» terminado: ¡ERROR!');

        // La información precisa del error ocurrido está en la
        // variable que recibe esta función.
        console.log(`Error Axios: ${error}`);
      }
    )
    .then(
      // Esta función se ejecutará automáticamente cuando «get()»
      // termine su proceso. NO IMPORTA si tuvo éxito u ocurrió un
      // error. SIEMPRE se ejecutará.
      function () {
        console.log('***«get()» terminado: Esto siempre debe verse');
      }
    );
  
  console.log('Después de GET');
}

// Ahora vamos a generar una nueva función, asíncrona que sustituya
// a «getItems()» para tratar de recuperar las fotos obtenidas del WS
async function getItemsAsync(nitems=12) {
  console.log(`Se solicitaron ${nitems} fotos en getItemsAsync.`);
  console.log('Antes de GET async');

  // En este caso NO usaremos «promises» sino que esperaremos a que
  // termine «get()» para continuar con la ejecución.
  let resp = null;
  try {
    resp = await axios.get('https://jsonplaceholder.typicode.com/photos');
  } catch(error) {
    console.log('***«get()» ASYNC terminado: ¡ERROR!');
    console.log(`Error ASYNC Axios: ${error}`);
  }

  console.log(`HTTPStatusCode ASYNC: ${resp.status}`);
  console.log(`Recibimos ${resp.data.length} fotos ASYNC`);

  console.log(`Se solicitaron ${nitems} fotos en ASYNC`);
  const fotos = resp.data.slice(0,nitems);
  console.log(`Tenemos ${fotos.length} fotos filtradas ASYNC`);

  console.log('Después de GET async');

  return fotos;
}

function Foto(props) {
  return (
    <div className="imagen">
      <img src={props.info.thumbnailUrl} alt="" />
      <h3>{props.info.title}</h3>
    </div>
  );
}

function ListaFotos(props) {
  return (
    <ul className="row">
      {
        props.items == null
          ? <h4>No hay fotos :(</h4>
          : props.items.map(
          (item) => (
            <li className="col-12 col-md-3" key={item.id} id={item.id}>
              <Foto info={item} />
            </li>  
          )
        )
      }
    </ul>
  );
}

function App() {
  const hcFotos = [
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
    // No podemos tener más de un elemento padre en lo que regresa
    // un componente de React. Entonces la primer solución es encerrar
    // todo entre div, pero esto genera un elemento extra y anidación
    // adicional el el DOM de HTML.
    // Una segunda manera de solucionarlo es utilizar un «fragment» de
    // React, cuya sintaxis es <React.Fragment>...</React.Fragment>
    // Al no tener un toolchain que se encargue de precompilar y
    // empaquetar nuestros módulos, scripts, ...NO podremos hacer uso
    // de la versión corta de los fragments, que se conocen como
    // «empty tags»: <></>
    <React.Fragment>
      <button onClick={
        () => {
          // Intentamos obtener las fotos, pero al estar el proceso
          // que las recupera en una función «promise» quedan
          // "perdidas" en otro hilo de ejecución y el resultado
          // de «getItems()» queda como «undefined».
          const fs = getItems(30);
          console.log(`En el botón cachamos: ${fs}`);
        }
      }>
        Recargar imágenes
      </button>
      <button onClick={
        async () => {
          const fs = await getItemsAsync(30);
          console.log(`En el botón async cachamos: ${JSON.stringify(fs)}`);
        }
      }>
        Recargar imágenes Async
      </button>
      <h1>R: Lista de imágenes disponibles</h1><div className="lista-imagenes">
        <ListaFotos items={hcFotos} />
      </div>
    </React.Fragment>
  );
}

// Creamos un nuevo componente con ESTADO que pueda obtener las fotos
// del WebService y actualizar la manera en la que se ve.
class AppC extends React.Component {
  constructor(props) {
    super(props);

    // Establecemos un estado inicial
    this.state = {
      wsFotos: null
    }

    // Hacemos que dentro de la función getItems() esté disponible
    // el objeto «this» de nuestro component AppC.
    // Esto debe hacerse para cada función interna a los componentes
    // donde queremos que esté disponible el contexto de clase.
    // La alternativa es utilizar funciones flecha para que «this» sea
    // resuelto de manera «léxica».
    this.getItems = this.getItems.bind(this);
  }

  getItems(nitems=12) {
    axios.get('https://jsonplaceholder.typicode.com/photos')
    .then(
      //function (resp) {
      // Si declaramos esta función de manera «regular», es decir,
      // usando «function», no tendremos disponible a «this»
      (resp) => {
        console.log('***C: «get()» terminado: ¡Éxito!');

        console.log(`C: HTTPStatusCode: ${resp.status}`);

        console.log(`C: Recibimos ${resp.data.length} fotos`);

        console.log(`C: Se solicitaron ${nitems} fotos en then.`);
        const fotos = resp.data.slice(0,nitems);
        console.log(`C: Tenemos ${fotos.length} fotos filtradas`);

        // Tenemos las fotos y el subjunto de ellas que deseamos
        // pintar. Ahora, a través del estado, decimos a React
        // que las pinte.
        this.setState({
          wsFotos: fotos
        });
      }
    )
    .catch(
      function (error) {
        console.log('***C:«get()» terminado: ¡ERROR!');
        console.log(`C:Error Axios: ${error}`);
      }
    )
    .then(
      function () {
        console.log('***«C:get()» terminado: Esto siempre debe verse');
      }
    );
  }

  render() {
    return(
      <React.Fragment>
      <button onClick={() => this.getItems()}>
        Recargar imágenes Async
      </button>
      <h1>R: Lista de imágenes disponibles</h1><div className="lista-imagenes">
        <ListaFotos items={this.state.wsFotos} />
      </div>
    </React.Fragment>
    );
  }
}

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

//root.render(<App />);
root.render(<AppC />);