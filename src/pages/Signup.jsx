import React from 'react';
import './Signin.css';
import image from '../components/image.png';
import { Link } from 'react-router-dom';

function Signup() {
    return (
        <div className="signin">
            <div className="image">
                <img src={image} alt="" />
                <span>Signin</span>
            </div>
            <div className="group9">
                <div className="form">
                    <div className="heading">
                        <span id='wlc-txt'>Welcome</span>
                        <span id='sh-desc'>Let’s sign you up quickly</span>
                    </div>
                    <form action="">
                    <input type="text" name="" id="" placeholder='Enter your name' />
                        <input type="email" name="" id="" placeholder='Enter your email' />
                        <input type="password" name="" id="" placeholder='Enter your password' />
                        <div className="group10">
                            <button>SIGNUP</button>
                            <span>
                                already have an account?
                                <Link id='link' to={'/signin'}> sign-in</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup