import React, { useContext, useEffect, useState } from "react";
import './Home.css';
import Sidebar from "../components/Sidebar";
import Group from "../components/Group";
import { Link } from "@mui/material";
import Footer from "../components/Footer";
import Authcontext from "../context/Authcontext";
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from "react-router-dom";

const supabase = createClient('https://ihexfffiwujwxafykxlf.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloZXhmZmZpd3Vqd3hhZnlreGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE2NzMzMjQsImV4cCI6MjAwNzI0OTMyNH0.-E9ZNWR4I2WXP4PaX7lVYGNAEC_Z2nRFq4jZjfQNvMg');

const Home = () => {
    let {user} = useContext(Authcontext)
    const [blogs,setBlogs] = useState([])
    console.log(user)
    const navigate = useNavigate()
    const getContent = async()=>{
        let { data: blogs, error } = await supabase
        .from('blogs')
        .select('*')
        console.log(blogs)
        setBlogs(blogs?.reverse())
    }
    useEffect(()=>{
        getContent()
    },[])
    return (
        <>
        <div className="home">
            <Sidebar className='sidebar' />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '90px',height:'auto',marginBottom:'50px' }}>
                <div className="section">
                    <div id='latest'></div>
                    Latest
                </div>
                {blogs?.map((content)=>{
                    let date = new Date(content.created_at).getDate()
                    let month = new Date(content.created_at).getMonth()+1;
                    let monthName = "";
                    {
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
                    }
                    return(
                        <div onClick={()=>navigate(`page/${content.id}/`)}>
                        <Group
                            username = {content.username}
                            heading = {content.heading}
                            content = {content.content}
                            date = {date}
                            monthname = {monthName}
                            tags = {content.tags}
                        />
                        </div>
                    )
                })}
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default Home;