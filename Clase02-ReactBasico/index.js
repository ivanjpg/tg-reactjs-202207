// Comencemos a utilizar componentes de React.

// Para definir un nuevo componente de React, podemos hacerlo
// de dos maneras diferentes.

// La primera es a través de una función de JS.
// Los identificadores de los componentes de React deben comenzar
// con mayúscula.
function FSaluda() {
  return <h3>F: Hola, tú.</h3>;
}

// Obtenemos el «root» de React para poder hacer «render» dentro
// de nuestro documento HTML.
const root = ReactDOM.createRoot(
  document.getElementById('root')
);

// Pintamos nuestro componente
root.render(<FSaluda />);

// La segunda manera de crear un componente en React es a través
// de una clase ES6, y esta debe extender a React.Component
// Además, se debe implementar por lo menos el método «render()»
class CSaluda extends React.Component {
  render() {
    return <h3>C: Hola, tú.</h3>;
  }
}

// Obtenemos un segundo «root» para evitar encimar los componentes.
const root2 = ReactDOM.createRoot(
  document.getElementById('root2')
);

// Pintamos en otro div el componente creado a través de una clase ES6.
root2.render(<CSaluda />);

// Los componentes de React pueden recibir información a través de lo
// que se conoce por conveción como «props», y son los «datos» que
// nuestro componente puede usar para realizar la función que necesite.

// En el caso de los componentes que se crean como funciones, debemos
// recibirlos como un parámetro.
function FPSaluda(props) {
  // Dentro de «props» viene la información que se le pasa al componente
  // a través de los atributos de la etiqueta.
  return <h1>FP: Hola, {props.nombre}</h1>;
}

const root3 = ReactDOM.createRoot(
  document.getElementById('root3')
);

root3.render(<FPSaluda nombre="Pierre-Simon Laplace" />);

// Trabajemos con los «props», pero ahora desde un componente
// creado a través de una clase.
class CPSaluda extends React.Component {
  render() {
    // Si tratamos de usar únicamente «props» obtendremos un error
    // dado que en el alcance (scope) de bloque, en este caso de la
    // función «render()», no tenemos ninguna variable con ese
    // identificador.

    // Debemos invocar a la variable de «instancia» o «global» a la
    // clase, que debe accederse usando «this».

    // En esta clase, en apariencia, jamás recibimos de manera
    // explícita a «props». Pero si observamos la documentación,
    // veremos que en la clase madre (React.Component), el 
    // constructor recibe justamente «props».

    // Podemos visualizar el contenido de «props» en la consola.
    // Como se trata de un objeto usualmente se mostrará solo como
    // "[Object object]", entonces para poder visualizar su contenido
    // hacemos uso de la función «JSON.stringify()» que «traducirá»
    // el objeto a una representación en cadena.
    console.log(`Props: ${JSON.stringify(this.props)}`);

    return <h1>CP: Hola, {this.props.nombre}</h1>;
  }
}

const root4 = ReactDOM.createRoot(
  document.getElementById('root4')
);

root4.render(<CPSaluda nombre="Pierre-Simon Laplace" />);


// Generemos ahora un componente a partir de otro componente.
// Esto es, vamos a generar «componentes compuestos».
// En este caso lo haremos usando una función.
function SaludaTodos() {
  return (
    <div>
      <FSaluda />
      <CPSaluda nombre="J. C. Maxwell" />
      <FPSaluda nombre="Alan M. Turing" />
      <CSaluda />
    </div>
  );
}

const root5 = ReactDOM.createRoot(
  document.getElementById('root5')
);

root5.render(<SaludaTodos />);

// Ejercicio 01
//    Generar un nuevo elemento de React que muestre un reloj
//    en la pantalla y que se actualice cada segundo.
//    No importa si se realiza con una función o una clase.
//      ******** Hora de término:  20:25hrs

// Obtenemos un elemento en el HTML para pintar el reloj
const root_reloj = ReactDOM.createRoot(
  document.getElementById('reloj')
);

// Al ser una función que comienza con minúscula, no cumple
// los requisitos para ser un elemento de React.
function reloj() {
  // Construir un elemento a través de JSX.
  const e = (
    <h3>Son las: {new Date().toLocaleTimeString()}</h3>
  );

  root_reloj.render(e);
}

// Mandamos llamar la función «reloj()» que crea un elemento y
// luego lo pinta.
reloj();

// Usando JS podemos hacer que la función se mande llamar cada
// segundo, esto lo logramos con «setInterval()»
// El primer parámetro es la función a ejecutar y el segundo cada
// cuánto se ejecutará (en milisegundos), hasta que se
// cancele el «timer».
// Esto quiere decir que por la misma construcción de la función
// «reloj()», «render()» se manda llamar cada segundo.
setInterval(reloj, 1000);

// El mandar llamar tantas veces a «render()» de manera directa, 
// genera que la estructura de nuestra aplicación se a poco 
// escalable y también poco mantenible.

// Escribamos ahora nuestro reloj como un componente de REact
// utilizando una clase.
class CReloj extends React.Component {
  render() {
    return(
      <h3>CSon las: {new Date().toLocaleTimeString()}</h3>
    );
  }
}

const root_reloj2 = ReactDOM.createRoot(
  document.getElementById('reloj2')
);

root_reloj2.render(<CReloj />);

// El render anterior solamente pinta el reloj una vez y
// no lo «actualiza».
// Podemos generar una función auxiliar para actualizar nuestro
// componente nuevo.
function csegundos() {
  root_reloj2.render(<CReloj />);
}

// Con «setInterval()» actualizamos la hora usando la función
// auxiliar que creamos.
setInterval(csegundos, 1000);

// Creamos una nueva versión del componente de reloj creado
// con clases. Pero ahora, será un componente CON ESTADO (Stateful).
// Hasta ahora, todos los componentes previos era componentes
// que no tenían estado (Stateless).
class RelojEstado extends React.Component {
  // Agregamos el constructor de la clase para poder
  // establecer un estado inicial
  constructor(props) {
    // Siempre que generemos un constructor propio para alguno
    // de nuestros componentes, debemos llamar primero al constructor
    // de la clase madre, pasándole «props».
    super(props);

    // Ahora asignamos a la variable de clase «state»
    this.state = {
      id: 'asdf',
      tiempo: new Date()
    };
  }

  // Usamos una función auxiliar que actualice el
  // estado de nuestro componente.
  actualizaReloj() {
    // A través de actualizar el estado, el cambio se refleja
    // en el componente. Esto es, React sabe que tiene que
    // repintar "de manera inteligente".

    // El estado NUNCA se debe actualizar directamente, esto solamente
    // se hace en el constructor. Para actualizar el estado en otro 
    // lado, necesariamente mandamos llamar a «setState()».
    this.setState({
      tiempo: new Date()
    });
  }

  // Existe un método que se ejecuta automáticamente DESPUÉS de
  // que el componente se pintó en el DOM. Es parte del ciclo de vida
  // de nuestro componente.
  componentDidMount() {
    setInterval(
      () => this.actualizaReloj(),
      1000
    );
  }

  render() {
    return (
      <h3>CESSon las: {this.state.tiempo.toLocaleTimeString()}</h3>
    );
  }
}

const root_reloj_estado = ReactDOM.createRoot(
  document.getElementById('reloj_estado')
);

root_reloj_estado.render(<RelojEstado />);