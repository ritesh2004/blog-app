import React from "react";
import './Home.css';
import Sidebar from "../components/Sidebar";
import Group from "../components/Group";

const Home = () => {
    return (
        <div className="home">
            <Sidebar className='sidebar' />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '90px'}}>
            <div className="section">
                    <div id='latest'></div>
                    Latest
                </div>
                <Group />
            </div>
        </div>
    )
}

export default Home;