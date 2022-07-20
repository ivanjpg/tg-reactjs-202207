// Para usar el contexto, importamos
import React, { useContext, useEffect, useState } from "react";

import {Navigate} from 'react-router-dom';

import axios from 'axios';

// Necesitamos el contexto a usar
import AuthContext from '../AuthContext';

const Carrito = () => {
  // Sabemos que en «App» tenemos una variable
  // de estado para «authInfo» y el getter
  // junto con el setter fueron pasados como
  // valor del contexto. Lo aprovechamos para
  // poder acceder a esa variable de estado
  // desde fuera de «App», en este caso, en
  // «Carrito»
  const [authInfo,setAuthInfo] = useContext(AuthContext);

  // Generamos una variable de estado para
  // los carritos de compra del usuario.
  const [carritos, setCarritos] = useState([]);

  // Ejercicio 01
  //    Generar la petición asíncrona que
  //    obtenga los carritos del usuario
  //    loggeado e imprimir en la pantalla
  //    la información correspondiente.

  const getCarritos = () => {
    let uid = authInfo.id;
    let jwt = authInfo.token;

    axios.get(`https://dummyjson.com/users/${uid}/carts`)
      .then(
        (resp) => {
          setCarritos(resp.data.carts);
        }
      )
      .catch(
        (error) => {
          console.log(`Error al cargar carritos: ${error}`);
        }
      );
  }

  // Revisamos que tengamos la información
  // del usuario loggeado, en caso contrario
  // vamos a la pantalla de loggeo.
  if(authInfo == null) {
    return(
      <Navigate to="/login" />
    );
  }

  useEffect(
    () => getCarritos(),
    []
  );

  return(
    <>
    {
      carritos.length < 1
      ? <h3>
        El usuario no tiene carritos de compra
        </h3>
      :
        carritos.map(
          (cart) => {
            return(
              <React.Fragment key={cart.id}>
              <h4>ID del carrito: {cart.id}</h4>
              <i>Total: ${cart.total}</i>
              <br />
              <b>Con descuento: ${cart.discountedTotal}</b>
              <hr />
              </React.Fragment>
            );
          }
        )

    }
    </>
  );
}

export default Carrito;