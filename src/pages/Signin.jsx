import React, { useContext, useState } from 'react';
import './Signin.css';
import image from '../components/image.png';
import { Link } from 'react-router-dom';
import Authcontext from '../context/Authcontext';
import { Typography } from '@mui/material';

function Signin() {
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    let {signin,TPsign,err,isLoading} = useContext(Authcontext)

    return (
        <div className="signin">
            <div className="image">
                <img src={image} alt="" />
                <span>Login</span>
            </div>
            <div className="group9">
                <div className="form">
                    <div className="heading">
                        <span id='wlc-txt'>Welcome</span>
                        <span id='sh-desc'>Let’s log you in quickly</span>
                    </div>
                    <form onSubmit={signin}>
                        <input type="email" name="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='Enter your email' />
                        <input type="password" name="password" onChange={(e)=>setPassword(e.target.value)} value={password}  placeholder='Enter your password' />
                        {err?<span style={{color:'red',fontSize:'large'}}>Something went wrong! Check Credentials</span>:<span></span>}
                        <div className="group10">
                            <button type='submit' style={isLoading?{backgroundColor:'grey',cursor:"not-allowed"}:{backgroundColor:'#6EEB83'}}>LOGIN</button>
                            <span>
                                don’t have an account?
                                <Link id='link' to={'/signup'}> sign-up</Link>
                            </span>
                        </div>
                    </form>
                    <Typography variant='h5' sx={{fontFamily:'Montserrat',color:'#FFF'}}>Or,</Typography>
                <button id='google' onClick={TPsign}>Google</button>
                </div>
            </div>
        </div>
    )
}

export default Signin