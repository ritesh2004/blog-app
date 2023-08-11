import React from 'react';
import Home from './pages/Home';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Blogpage from './pages/Blogpage';
import Createpage from './pages/Createpage';
import { Authprovider, SelectedBlog } from './context/Authcontext';
import Privateroute from './utils/Privateroute';

// Database Password = XAkXXPhaUMVkDrpI


function App() {
  return (
    <BrowserRouter>
    <Authprovider>
    <Routes>
      <Route path='/' Component={Home}/>
      <Route path='/signin' Component={Signin}/>
      <Route path='/signup' Component={Signup}/>
      {/* <Route Component={Privateroute}> */}
        <Route path='/page/:id/' element={<Privateroute Component={SelectedBlog}/>}/>
        <Route path='/create' element={<Privateroute Component={Createpage}/>}/>
      {/* </Route> */}
    </Routes>
    </Authprovider>
    </BrowserRouter>
  );
}

export default App;
