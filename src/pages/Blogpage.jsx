import React, { useEffect, useState } from 'react';
import './Blogpage.css';
import { Typography } from '@mui/material';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://ihexfffiwujwxafykxlf.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloZXhmZmZpd3Vqd3hhZnlreGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE2NzMzMjQsImV4cCI6MjAwNzI0OTMyNH0.-E9ZNWR4I2WXP4PaX7lVYGNAEC_Z2nRFq4jZjfQNvMg');

function Blogpage() {
  const {id} = useParams()
  const [blog,setBlog] = useState([])
  console.log(id)
  const getBlog = async()=>{
    let { data: blogs, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id',id)
      .maybeSingle()
    console.log(blogs)
    setBlog(blogs)
    }
  
  useEffect(()=>{
    getBlog()
  },[])

  let date = new Date(blog.created_at).getDate()
  let month = new Date(blog.created_at).getMonth()+1;
  let year = new Date(blog.created_at).getFullYear();
  let monthName = "";
  if(month===1){
      monthName = "Jan"
  }
  else if(month===2){
      monthName = "Fab"
  }
  else if(month===3){
      monthName = "Mar"
  }
  else if(month===4){
      monthName = "Apr"
  }
  else if(month===5){
      monthName = "May"
  }
  else if(month===6){
      monthName = "Jun"
  }
  else if(month===7){
      monthName = "Jul"
  }
  else if(month===8){
      monthName = "Aug"
  }
  else if(month===9){
      monthName = "Sep"
  }
  else if(month===10){
      monthName = "Oct"
  }
  else if(month===11){
      monthName = "Nov"
  }
  else if(month===12){
      monthName = "Dec"
  }

  return (
    <>

    <div className="blogpage">
      <div className="blog-con">
        <Typography className='typo'>
          {blog?.heading}
        </Typography>
        <div className="author">
          <span>written by @{blog?.username}</span>
          <span>on {date} {monthName} {year}</span>
        </div>
        <div className="blog-content">
          <span style={{color:'#FFF',fontSize:'64px',fontWeight:'400'}}>{blog?.content?.slice(0,1)}</span>
          {blog?.content?.slice(1)}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
  }

export default Blogpage