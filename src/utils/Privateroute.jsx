import React, { useContext, useEffect, useState } from 'react';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Authcontext from '../context/Authcontext';
import { SignIn } from '@supabase/auth-ui-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://ihexfffiwujwxafykxlf.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloZXhmZmZpd3Vqd3hhZnlreGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE2NzMzMjQsImV4cCI6MjAwNzI0OTMyNH0.-E9ZNWR4I2WXP4PaX7lVYGNAEC_Z2nRFq4jZjfQNvMg');

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