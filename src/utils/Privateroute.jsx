import React, { useContext, useEffect, useState } from 'react';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Authcontext from '../context/Authcontext';
import { SignIn } from '@supabase/auth-ui-react';

function Privateroute({Component}) {
  let {user} = useContext(Authcontext)
  let navigate = useNavigate()
  useEffect(()=>{
    if (!user) {
      navigate('/signin')
    }
  })
  return (
    <Component/>
  );
}

export default Privateroute