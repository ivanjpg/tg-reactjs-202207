import {useState} from 'react';

import axios from 'axios';

const Login = () => {
  // Declaramos el uso de estados para
  // el usuario y la contraseña.
  const [usuario,setUsuario] = useState('');
  const [password,setPassword] = useState('');

  // Creamos una función que maneje la lógica
  // del ingreso del usuario.
  const hazLogin = () => {
    axios.post(
      'https://dummyjson.com/auth/login',
      JSON.stringify({
        username: usuario,
        password: password
      }),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then(
      (resp) => {
        console.log(`RESP: ${JSON.stringify(resp)}`);
      }
    )
    .catch(
      (error) => {
        console.log(`ERROR: ${error}`);
      }
    )
  }

  // Definimos una función que se ejecutará
  // cuando el usuario intente enviar el
  // formulario.
  const enviaForma = (evento) => {
    // Detenemos / prevenimos la ejecución
    // de la acción predeterminada para
    // evento que ejecutó / disparó esta
    // función. En esta ocasión el evento
    // es «submit».
    evento.preventDefault();

    // Si no usáramos estados, podríamos
    // recuperar el contenido de los «input»
    // con jQuery o JS puro. Esto si tuvieran
    // un ID.
    //let usuario = $('#usuario');
    //let usuario = document.getElementById('usuario');

    console.log(`Usuario: *${usuario}*\nContraseña: *${password}*`);

    // Mandamos llamar a la función que 
    // contiene la lógica para el login
    hazLogin();
  }

  return (
    <>
      <h3>Ingrese sus datos para continuar</h3>

      <form onSubmit={enviaForma}>
        <label htmlFor="">
          Usuario:
          <input 
            onChange={
              (evento) => {
                setUsuario(evento.target.value)
              }
            }
            type="text" />
        </label><br />
        
        <label htmlFor="">
          Contraseña:
          <input
            onChange={
              (evento) => {
                setPassword(evento.target.value)
              }
            }
            type="password" />
        </label> <br />

        <input type="submit" value="Ingresar" />
      </form>
    </>
  )
}

export default Login;