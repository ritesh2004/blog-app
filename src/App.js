import React from 'react';
import Home from './pages/Home';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Signin from './pages/Signin';
import Signup from './pages/Signup';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' Component={Home}/>
      <Route path='/signin' Component={Signin}/>
      <Route path='/signup' Component={Signup}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
