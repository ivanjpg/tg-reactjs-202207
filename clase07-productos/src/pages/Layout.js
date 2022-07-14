import {Link, Outlet} from 'react-router-dom';

const Layout = () => {
  return(
    <>
    <nav>
      <ul className="row">
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='login'>Login</Link>
        </li>
        <li>
          <Link to='usuario'>Usuario</Link>
        </li>
        <li>
          <Link to='productos'>Productos</Link>
        </li>
      </ul>
    </nav>
    <Outlet />
    </>
  );
}

export default Layout;