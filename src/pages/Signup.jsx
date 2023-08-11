import React, { useContext, useEffect, useState } from 'react';
import './Signin.css';
import image from '../components/image.png';
import { Link } from 'react-router-dom';
import Authcontext from '../context/Authcontext';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#6EEB83',
  border: 'none',
  boxShadow: 24,
  p: 4,
};

function Signup() {

    let {signup,TPsign,errSignup,isLoading,isSent} = useContext(Authcontext);


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [form,setForm] = useState({});
    const handleForm = (e) =>{
        const {name,value} = e.target;
        setForm((preVal)=>{
            return {...preVal,
                    [name]:value
            }
        })
    }

    useEffect(()=>{
        if (isSent) {
         handleOpen()   
        }
    },[isSent])

    // console.log(isSent)
    return (
        <div className="signin">
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Verify your email
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            An email is sent to your registered mail
          </Typography>
        </Box>
      </Modal>
            <div className="image">
                <img src={image} alt="" />
                <span>Signup</span>
            </div>
            <div className="group9">
                <div className="form">
                    <div className="heading">
                        <span id='wlc-txt'>Welcome</span>
                        <span id='sh-desc'>Let’s sign you up quickly</span>
                    </div>
                    <form onSubmit={signup}>
                        <input type="email" name="email" onChange={handleForm} value={form.email} placeholder='Enter your email' />
                        <input type="password" name="password" onChange={handleForm} value={form.password} placeholder='Enter your password' />
                        {errSignup?<span style={{color:'red',fontSize:'large'}}>Something went wrong! Check Credentials</span>:<span></span>}
                        <div className="group10">
                            <button type='submit' style={isLoading?{backgroundColor:'gray',cursor:'not-allowed'}:{backgroundColor:'#6EEB83'}}>SIGNUP</button>
                            <span>
                                already have an account?
                                <Link id='link' to={'/signin'}> sign-in</Link>
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

export default Signup