import { Outlet } from 'react-router-dom';

const Layout = () => {
  return(
    <>
    <nav>
      <ul className="row">
        <li>Home</li>
        <li>Productos</li>
        <li>Usuarios</li>
      </ul>
    </nav>

    {/* 
      En el outlet aparecerá el elemento
      designado en la ruta anidada (hija).
    */}
    <Outlet />
    </>
  );
}

export default Layout;