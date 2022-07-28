import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/Login';
import Productos from './components/Productos';
import Carritos from './components/Carritos';
import E404 from './components/E404';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />

          <Route path='productos' element={<Productos />} />
          <Route path='login' element={<Login />} />
          <Route path='carritos' element={<Carritos />} />

          <Route path='*' element={<E404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;