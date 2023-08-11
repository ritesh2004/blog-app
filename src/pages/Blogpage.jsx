import React from 'react';
import './Blogpage.css';
import { Typography } from '@mui/material';
import Footer from '../components/Footer';


function Blogpage(props) {

  let date = new Date(props.selected?.created_at).getDate()
  let month = new Date(props.selected?.created_at).getMonth()+1;
  let year = new Date(props.selected?.created_at).getFullYear();
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
          {props.selected?.heading}
        </Typography>
        <div className="author">
          <span>written by @{props.selected?.username}</span>
          <span>on {date} {monthName} {year}</span>
        </div>
        <div className="blog-content">
          <span style={{color:'#FFF',fontSize:'64px',fontWeight:'400'}}>{props.selected?.content?.slice(0,1)}</span>
          {props.selected?.content?.slice(1)}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
  }

export default Blogpage