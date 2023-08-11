import React, { useContext, useState } from 'react';
import './Createpage.css';
import { Typography } from '@mui/material';
import Footer from '../components/Footer';
import Authcontext from '../context/Authcontext';

function Createpage() {
  let {postBlog} = useContext(Authcontext)
  const [heading,setheading] = useState("")
  const [content,setContent] = useState("")
  const [tag,setTag] = useState("")
  
  // console.log(user)
  // console.log(username)
  
  return (
    <>
    <div className="createpage">
        <div className="create-con">
            <Typography className='typ'>
                Welcome
            </Typography>
            <span>Let's share your blog</span>
            <form onSubmit={postBlog}>
                <input type="text" name='heading' onChange={(e)=>setheading(e.target.value)} value={heading} placeholder="Enter your blog's heading"/>
                <textarea name="content" cols="30" rows="10" onChange={(e)=>setContent(e.target.value)} value={content} placeholder='Type content here...'/>
                <input type="text" name='tag' onChange={(e)=>setTag(e.target.value)} value={tag} placeholder="Tags e.g.#tag1,#tag2"/>
                <button type='submit'>SHARE</button>
            </form>
            {/* {!err?<Snack cmd="open" text="Shared Successfully" />:<span></span>} */}
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default Createpage