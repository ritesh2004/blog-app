import React, { useContext, useEffect, useState } from 'react';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';
import Authcontext from '../context/Authcontext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SearchIcon from '@mui/icons-material/Search';
import Group from './Group';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: '#272727',
    border: 'none',
    borderRadius:'8px',
    boxShadow: 24,
    p: 4,
    display:'flex',
    gap:'10px'
};

function Sidebar(props) {
    const navigate = useNavigate();
    const [text,setText] = useState("");

    const [data,setData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(()=>{
        setData(props?.data)
    },[props])

    const handleSearch = () =>{
        return (
            data.filter((blog)=>(
                blog?.heading.includes(text) || blog?.content.includes(text) || blog?.tags.includes(text)
            ))
        )
    }

    let { logout, user } = useContext(Authcontext)
    return (
        <div style={{ width: '95px', height: '730px' }}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div id='modal-box'>
                <div style={{display:'flex',gap:'5px'}}>
                    <input type='text' id='search-ip' name='search' placeholder='Search...' onChange={e=>setText(e.target.value)} value={text} />
                    <Button variant='outlined' color='success' onClick={handleSearch}><SearchIcon/></Button>
                    </div>
                    <br/>
                    {text?
                    handleSearch().map((blog)=>{
                        return(
                            <div id='search-result' onClick={()=>navigate(`page/${blog.id}/`)}>
                                {blog?.heading}
                            </div>
                        )
                    }):<span></span>
                    }
                </div>
            </Modal>
            <div className="sidebar">
                {user ? <div className="dp">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 66" fill="none">
                        <circle cx="33" cy="33" r="33" fill="#6EEB83" />
                    </svg>
                    <span style={{ textTransform: 'capitalize' }}>{user?.email[0]}</span>
                </div> : <div>
                    <Button variant='contained' color='success' onClick={() => navigate('/signin')}>login</Button>
                </div>}
                <div className="search" onClick={handleOpen}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <mask id="mask0_17_195" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="40">
                            <rect width="40" height="40" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_17_195)">
                            <path d="M31.5 33.8333L22.1667 24.5C21.3333 25.1667 20.375 25.6944 19.2917 26.0833C18.2083 26.4722 17.0556 26.6667 15.8333 26.6667C12.8056 26.6667 10.2433 25.6183 8.14667 23.5217C6.04889 21.4239 5 18.8611 5 15.8333C5 12.8056 6.04889 10.2428 8.14667 8.145C10.2433 6.04833 12.8056 5 15.8333 5C18.8611 5 21.4239 6.04833 23.5217 8.145C25.6183 10.2428 26.6667 12.8056 26.6667 15.8333C26.6667 17.0556 26.4722 18.2083 26.0833 19.2917C25.6944 20.375 25.1667 21.3333 24.5 22.1667L33.875 31.5417C34.1806 31.8472 34.3333 32.2222 34.3333 32.6667C34.3333 33.1111 34.1667 33.5 33.8333 33.8333C33.5278 34.1389 33.1389 34.2917 32.6667 34.2917C32.1944 34.2917 31.8056 34.1389 31.5 33.8333ZM15.8333 23.3333C17.9167 23.3333 19.6878 22.6044 21.1467 21.1467C22.6044 19.6878 23.3333 17.9167 23.3333 15.8333C23.3333 13.75 22.6044 11.9789 21.1467 10.52C19.6878 9.06222 17.9167 8.33333 15.8333 8.33333C13.75 8.33333 11.9789 9.06222 10.52 10.52C9.06222 11.9789 8.33333 13.75 8.33333 15.8333C8.33333 17.9167 9.06222 19.6878 10.52 21.1467C11.9789 22.6044 13.75 23.3333 15.8333 23.3333Z" fill="#6EEB83" />
                        </g>
                    </svg>
                    <span className='text'>search</span>
                </div>
                <div className="create-icon" onClick={() => navigate('/create')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <mask id="mask0_2_120" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="40">
                            <rect width="40" height="40" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_2_120)">
                            <path d="M20.083 28.333C20.4723 28.333 20.7987 28.2013 21.062 27.938C21.326 27.674 21.458 27.3473 21.458 26.958V21.5H27C27.3613 21.5 27.674 21.368 27.938 21.104C28.2013 20.84 28.333 20.5137 28.333 20.125C28.333 19.7083 28.2013 19.368 27.938 19.104C27.674 18.84 27.3473 18.708 26.958 18.708H21.458V13C21.458 12.6387 21.326 12.3263 21.062 12.063C20.7987 11.799 20.4723 11.667 20.083 11.667C19.6943 11.667 19.368 11.799 19.104 12.063C18.84 12.3263 18.708 12.6527 18.708 13.042V18.708H13C12.6387 18.708 12.326 18.847 12.062 19.125C11.7987 19.403 11.667 19.7363 11.667 20.125C11.667 20.5137 11.7987 20.84 12.062 21.104C12.326 21.368 12.6527 21.5 13.042 21.5H18.708V27C18.708 27.3613 18.84 27.674 19.104 27.938C19.368 28.2013 19.6943 28.333 20.083 28.333ZM20 36.667C17.6667 36.667 15.486 36.2363 13.458 35.375C11.4307 34.5137 9.66701 33.333 8.16701 31.833C6.66701 30.333 5.48634 28.5693 4.62501 26.542C3.76367 24.514 3.33301 22.3333 3.33301 20C3.33301 17.6667 3.76367 15.486 4.62501 13.458C5.48634 11.4307 6.66701 9.66699 8.16701 8.16699C9.66701 6.66699 11.4307 5.48633 13.458 4.62499C15.486 3.76366 17.6667 3.33299 20 3.33299C22.3333 3.33299 24.514 3.76366 26.542 4.62499C28.5693 5.48633 30.333 6.66699 31.833 8.16699C33.333 9.66699 34.5137 11.4307 35.375 13.458C36.2363 15.486 36.667 17.6667 36.667 20C36.667 22.3333 36.2363 24.514 35.375 26.542C34.5137 28.5693 33.333 30.333 31.833 31.833C30.333 33.333 28.5693 34.5137 26.542 35.375C24.514 36.2363 22.3333 36.667 20 36.667ZM20 33.875C23.8333 33.875 27.104 32.5207 29.812 29.812C32.5207 27.104 33.875 23.8333 33.875 20C33.875 16.1667 32.5207 12.896 29.812 10.188C27.104 7.47933 23.8333 6.12499 20 6.12499C16.1667 6.12499 12.896 7.47933 10.188 10.188C7.47934 12.896 6.12501 16.1667 6.12501 20C6.12501 23.8333 7.47934 27.104 10.188 29.812C12.896 32.5207 16.1667 33.875 20 33.875Z" fill="#6EEB83" />
                        </g>
                    </svg>
                    <span className='text'>create</span>
                </div>
                {user ? <div className='logout'>
                    <Button variant="contained" color='error' onClick={logout}><LogoutIcon /></Button>
                </div> : <></>}
            </div>
        </div>
    )
}

export default Sidebar