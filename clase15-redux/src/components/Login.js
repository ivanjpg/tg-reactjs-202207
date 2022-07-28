import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { authLogin } from '../slices/authSlice';

const Login = () => {
  const auth = useSelector(
    (state) => state.auth
  );

  const generalState = useSelector(
    (state) => state
  );

  console.log(`GSTATE: ${JSON.stringify(generalState)}`);

  const dispatch = useDispatch();

  const userRef = useRef('kminchelle');
  const passwordRef = useRef('0lelplR');

  const doLogin = (e) => {
    e.preventDefault();

    let user = userRef.current.value;
    let pass = passwordRef.current.value;

    dispatch(
      authLogin(
        {
          username: user,
          password: pass
        }
      )
    );
  }

  return(
    auth == null || !auth?.token ?
    <form onSubmit={doLogin}>
      <input
        ref={userRef}
        placeholder="Usuario"
        defaultValue={userRef.current}
        type="text" />

      <input
          ref={passwordRef}
          placeholder="Password"
          defaultValue={passwordRef.current}
          type="password" />

      <button type='submit'>
        Ingresar
      </button>
    </form>
    :
    <div className="row">
      <h3>Bienvenido {auth.username}</h3>
      <p>
        <img src={auth.image} />
      </p>
    </div>
  );
}

export default Login;