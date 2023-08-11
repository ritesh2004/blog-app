import React from 'react';
import './Group.css'
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Group(props) {
    const navigate = useNavigate();
    let tags = props.tags?.split(',');
    return (
        <div className="group">
            <div className="feed-desktop">
                <div className="feed-desktop-con">
                    <div className="group1">
                        <span className="heading">
                            {props.heading}
                        </span>
                        <div className="body">
                            <Typography>
                                {props.content}<span style={{ color: '#6EEB83' }}>...read more</span>
                            </Typography>
                        </div>
                        <div className="tag">
                            {tags?.map((tag)=>{
                                return (
                                    <div className="tag1">
                                        {tag}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="group3">
                        <span className="date">
                            {props.date} {props.monthname}
                        </span>
                        <span className="poster">
                            @{props.username}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Group