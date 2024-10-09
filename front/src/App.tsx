import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import Home from './Components/Home/Home';
import Product from './Components/product/Product';
import Cart from './Components/Cart/Cart';
import OneProduct from './Components/OneProduct/OneProduct';
import { ToastContainer } from 'react-toastify';

function App() {
  const [iduser, setIduser] = useState(null); 

  return (
    <div>
      <BrowserRouter>
        <ToastContainer autoClose={3000} position={"top-center"} hideProgressBar={true} />
        <Routes>
          <Route path='/login' element={<Login iduser={iduser} setUser={setIduser} />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/' element={<Home  iduser={iduser} setUser={setIduser} />} />
          <Route path='/products' element={<Product />} />
          <Route path='/cart' element={<Cart iduser={iduser} />} />
          <Route path='/one' element={<OneProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
