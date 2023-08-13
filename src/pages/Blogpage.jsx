import React from 'react';
import './Blogpage.css';
import { Typography } from '@mui/material';
import Footer from '../components/Footer';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';


function Blogpage(props) {
  const navigate = useNavigate();

  let date = new Date(props.selected?.created_at).getDate()
  let month = new Date(props.selected?.created_at).getMonth() + 1;
  let year = new Date(props.selected?.created_at).getFullYear();
  let monthName = "";
  if (month === 1) {
    monthName = "Jan"
  }
  else if (month === 2) {
    monthName = "Fab"
  }
  else if (month === 3) {
    monthName = "Mar"
  }
  else if (month === 4) {
    monthName = "Apr"
  }
  else if (month === 5) {
    monthName = "May"
  }
  else if (month === 6) {
    monthName = "Jun"
  }
  else if (month === 7) {
    monthName = "Jul"
  }
  else if (month === 8) {
    monthName = "Aug"
  }
  else if (month === 9) {
    monthName = "Sep"
  }
  else if (month === 10) {
    monthName = "Oct"
  }
  else if (month === 11) {
    monthName = "Nov"
  }
  else if (month === 12) {
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
            <span style={{ color: '#FFF', fontSize: '64px', fontWeight: '400' }}>{props.selected?.content?.slice(0, 1)}</span>
            {props.selected?.content?.slice(1)}
          </div>
        </div>
        {props.show?<div id='edit-delete-op' style={{ display: 'flex', gap: '20px', flexDirection: 'column', alignItems: 'start' }}>
          <svg id='edit-icon' stroke="green" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg" onClick={()=>navigate(`/edit/${props.selected.id}/`)}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          <span onClick={()=>{props.delete()}}><DeleteIcon id="delete-icon"/></span>
        </div>:<></>}
      </div>
      <Footer />
    </>
  )
}

export default Blogpage