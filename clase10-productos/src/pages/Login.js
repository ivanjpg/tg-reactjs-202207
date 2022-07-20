// Agregamos el import para «useRef»
// Con «useRef» tenemos una referencia
// directa a algún elemento del DOM, por lo
// que podemos acceder directamente a él
// desde React.
import {useState, useRef, useContext} from 'react';

import axios from 'axios';
import FlashMsg from '../FlashMsg';

import AuthContext from '../AuthContext';

const Login = () => {
  const [usuario,setUsuario] = useState('');
  const [password,setPassword] = useState('');

  const [authToken, setAuthToken] = useState('');
  const [infoLogin, setInfoLogin] = useState({});

  // Usamos el contexto de autenticación
  const [authInfo,setAuthInfo] = useContext(AuthContext);

  // Añadimos una referencia que servirá
  // para que un valor persista entre renders
  // de nuestro componente, pero en cada
  // asignación nueva, no genera por si misma
  // un render nuevo.
  const refUsuario = useRef('');
  const refPassword = useRef('');

  const hazLogin = () => {
    axios.post(
      'https://dummyjson.com/auth/login',
      JSON.stringify({
        // username: usuario,
        // password: password
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

    // A diferencia de las variables
    // generadas con «useState», el acceso
    // al valor en el caso de «useRef» no es
    // de manera directa. Debemos acceder
    // como "un elemento del DOM".
    console.log(`Usuario: *${refUsuario.current?.value}*\nContraseña: *${refPassword.current?.value}*`);

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
                // onChange={(evento) => {
                //   setUsuario(evento.target.value);
                // } }
                ref={refUsuario}
                type="text" />
            </label><br />


{/* 
  Revisar Waring de "uncontrolled input" 
  Y que con "value" no deja escribir.
*/}

            <label htmlFor="">
              Contraseña:
              <input
                // onChange={(evento) => {
                //   setPassword(evento.target.value);
                // } }
                ref={refPassword}
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