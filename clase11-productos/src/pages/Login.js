import {useState, useRef, useContext} from 'react';

import axios from 'axios';
import FlashMsg from '../FlashMsg';

import AuthContext from '../AuthContext';

const Login = () => {
  const [usuario,setUsuario] = useState('');
  const [password,setPassword] = useState('');

  const [authToken, setAuthToken] = useState('');
  const [infoLogin, setInfoLogin] = useState({});

  const [authInfo,setAuthInfo] = useContext(AuthContext);

  // Ponemos valores por default para rellenar
  // los input de usuario contraseña con los
  // requeridos por el WS.
  // Estos se accesan a través de la propiedad
  // «current» de la referencia.
  const refUsuario = useRef('kminchelle');
  const refPassword = useRef('0lelplR');

  const hazLogin = () => {
    axios.post(
      'https://dummyjson.com/auth/login',
      JSON.stringify({
        username: refUsuario.current.value,
        password: refPassword.current.value
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

        setAuthToken(resp.data.token);

        setInfoLogin(resp.data);
        setAuthInfo(resp.data);
      }
    )
    .catch(
      (error) => {
        console.log(`ERROR: ${error}`);

        setAuthToken('');
        setInfoLogin({});
        setAuthInfo();
      }
    )
  }

  const enviaForma = (evento) => {
    evento.preventDefault();

    console.log(`Usuario: *${refUsuario.current?.value}*\nContraseña: *${refPassword.current?.value}*`);

    hazLogin();
  }

  return (
    <>      
      {
        authInfo == null
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
                ref={refUsuario}
                defaultValue={refUsuario.current}
                type="text" />
            </label><br />

            <label htmlFor="">
              Contraseña:
              <input
                ref={refPassword}
                defaultValue={refPassword.current}
                type="password" />
            </label> <br />

            <input type="submit" value="Ingresar" />
          </form></>
        :
        <div>
          <h3>Usuario loggeado</h3>
          <img className='row' src={authInfo.image} />
          <i>{authInfo.email}</i>
        </div>
      }
    </>
  )
}

export default Login;