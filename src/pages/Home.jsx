import React, { useContext, useEffect, useState } from "react";
import './Home.css';
import Sidebar from "../components/Sidebar";
import Group from "../components/Group";
import Footer from "../components/Footer";
import Authcontext from "../context/Authcontext";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';



const Home = () => {
    let {getContent,allBlogs} = useContext(Authcontext)
    // const [blogs,setBlogs] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    // console.log(user)
    const navigate = useNavigate()
    
    useEffect(()=>{
        setIsLoading(true)
        getContent()
        setIsLoading(false)
    },[])
    return (
        <>
        <div className="home">
            <Sidebar className='sidebar' data={allBlogs} />
            {isLoading?<CircularProgress color="success"/>:<span></span>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '90px',height:'auto',marginBottom:'50px' }}>
                <div className="section">
                    <div id='latest'></div>
                    Latest
                </div>
                {allBlogs?.map((content)=>{
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
                        {isLoading?<CircularProgress color="success"/>:<span></span>}
                        <Group
                            username = {content.username}
                            heading = {content.heading}
                            content = {content.content?.slice(0,400)}
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