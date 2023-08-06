import React from 'react';
import './Signin.css';
import image from '../components/image.png';
import { Link } from 'react-router-dom';

function Signin() {
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
                    <form action="">
                        <input type="email" name="" id="" placeholder='Enter your email' />
                        <input type="password" name="" id="" placeholder='Enter your password' />
                        <div className="group10">
                            <button>LOGIN</button>
                            <span>
                                don’t have an account?
                                <Link id='link' to={'/signup'}> sign-up</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signin