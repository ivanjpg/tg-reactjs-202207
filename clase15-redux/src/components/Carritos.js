import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from 'react-router-dom';

import { getUserCarts } from '../slices/cartsSlice';

const Carritos = () => {
  const auth = useSelector(
    (state) => state.auth
  );
  const carritos = useSelector(
    (state) => state.carts
  );

  const dispatch = useDispatch();

  const getCarritos = () => {
    if(!auth?.token) {
      return;
    }

    dispatch( getUserCarts(auth.id) );
  }

  useEffect(
    getCarritos,
    []
  );

  if(!auth?.token) {
    return(
      <Navigate to='/login' />
    );
  }

  return(
    <div className="row">
      {
        carritos == null || !carritos?.length
        ? <h3>El usuario no tiene carritos de compra</h3>
        : carritos.map(
          (carrito) => (
            <div
              className="col-12 col-lg-3"
              key={carrito.id}>
              <p>
                <b>ID: {carrito.id}</b><br />
                <i>{carrito.total}</i>
              </p>

              <hr />
            </div>
          )
        )
      }
    </div>
  );
}

export default Carritos;