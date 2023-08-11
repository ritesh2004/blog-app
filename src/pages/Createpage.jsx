import React, { useContext, useState } from 'react';
import './Createpage.css';
import { Typography } from '@mui/material';
import Footer from '../components/Footer';
import Authcontext from '../context/Authcontext';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

const supabase = createClient('https://ihexfffiwujwxafykxlf.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloZXhmZmZpd3Vqd3hhZnlreGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE2NzMzMjQsImV4cCI6MjAwNzI0OTMyNH0.-E9ZNWR4I2WXP4PaX7lVYGNAEC_Z2nRFq4jZjfQNvMg');

function Createpage() {
  let navigate = useNavigate()
  let {user} = useContext(Authcontext)
  const [heading,setheading] = useState("")
  const [content,setContent] = useState("")
  const [tag,setTag] = useState("")
  const [err,setErr] = useState(false)

  let [username,_] = user?.email?.split('@')
  console.log(user)
  console.log(username)
  const postBlog = async(e)=>{
    e.preventDefault()
    const { data, error } = await supabase
      .from('blogs')
      .insert([
        { heading: heading, content: content, username:username,tags:tag },
      ])
      .select()
    if (error) {
      console.log(error)
      alert("Something went wrong! Check your connectivity")
      setErr(true)
    }else{
      navigate('/')
    }
  }
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