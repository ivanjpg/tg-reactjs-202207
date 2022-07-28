import { useSelector, useDispatch } from "react-redux";

import { useEffect, useRef } from "react";
import { getProducts, searchProducts } from "../slices/productsSlice";

const Productos = () => {
  const products = useSelector(
    (state) => state.products
  );

  const dispatch = useDispatch();
  const searchRef = useRef();

  useEffect(
    () => { dispatch( getProducts() ) },
    []
  );

  const buscaProducto = (e) => {
    let q = searchRef.current.value;

    dispatch( searchProducts(q) );
  }

  return(
    <>
    <h3>Productos disponibles</h3>

    <div
      style={{position: 'fixed', backgroundColor: 'grey'}}
      className="row">
      <form>
        <input 
          placeholder="Buscar producto"
          ref={searchRef}
          onChange={buscaProducto}
          type="text" />

        <b>Mostrando <i>{products.length}</i> productos.</b>
      </form>
    </div>

    <div
      style={{marginTop: '60px'}}
      className="row">
      {
        products == null || products?.length < 1
        ? <h4>No hay productos :(</h4>
        : products.map(
            (prod, idx) => (
              <div 
                className="col-12 col-lg-4"
                key={idx}>
                <img src={prod.thumbnail} alt="" />
                <p>
                  <b>{prod.title}</b>
                </p>
              </div>
            )
          )
      }
    </div>
    </>
  );
}

export default Productos;