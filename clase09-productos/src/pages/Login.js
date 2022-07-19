import {useState} from 'react';

import axios from 'axios';
import FlashMsg from '../FlashMsg';

const Login = () => {
  const [usuario,setUsuario] = useState('');
  const [password,setPassword] = useState('');

  // De manera provisional usamos una nueva
  // variable de estado para verificar si el
  // usuario está loggeado o no, dependiendo
  // de si tenemos ya un JWT.
  const [authToken, setAuthToken] = useState('');

  // Definimos una variable de estado para
  // la información del usuario loggeado.
  const [infoLogin, setInfoLogin] = useState({});

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

        console.log(`JWT: ${resp.data.token}`);

        // Establecemos la variable de estado
        // al valor devuelto por el WS.
        setAuthToken(resp.data.token);

        // Guardamos en el estado la
        // información del usuario loggeado
        setInfoLogin(resp.data);
      }
    )
    .catch(
      (error) => {
        console.log(`ERROR: ${error}`);

        // Al haber ocurrido un error en la
        // autenticación, debemos establecer
        // el token a vacío.
        setAuthToken('');
        
        // Lo mismo con la información
        // del usuario loggeado
        setInfoLogin({});
      }
    )
  }

  const enviaForma = (evento) => {
    evento.preventDefault();

    console.log(`Usuario: *${usuario}*\nContraseña: *${password}*`);

    hazLogin();
  }

  return (
    <>      
      {
        authToken.length < 1
          ?
          <>
          <h3>Ingrese sus datos para continuar</h3>
          
          <FlashMsg tiempo={2500}>
            <h4>No está autenticado.</h4>
          </FlashMsg>

          <form onSubmit={enviaForma}>
            <label htmlFor="">
              Usuario:
              <input
                onChange={(evento) => {
                  setUsuario(evento.target.value);
                } }
                type="text" />
            </label><br />

            <label htmlFor="">
              Contraseña:
              <input
                onChange={(evento) => {
                  setPassword(evento.target.value);
                } }
                type="password" />
            </label> <br />

            <input type="submit" value="Ingresar" />
          </form></>
        :
        <div>
          <h3>Usuario loggeado</h3>
          <img className='row' src={infoLogin.image} />
          <i>{infoLogin.email}</i>
        </div>
      }
    </>
  )
}

export default Login;