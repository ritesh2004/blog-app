import React, { useContext, useEffect, useState } from 'react';
import './Createpage.css';
import { Typography } from '@mui/material';
import Footer from '../components/Footer';
import Authcontext from '../context/Authcontext';
import { useParams } from 'react-router-dom';

function Editpage() {
    const { id } = useParams()
    let {getBlog,editContent,selected,isUploading} = useContext(Authcontext)
    useEffect(()=>{
        getBlog(id)
    },[])

    const [heading, setheading] = useState(selected?.heading)
    const [content, setContent] = useState(selected?.content)
    const [tag, setTag] = useState(selected?.tags)

    return (
        <>
            <div className="createpage">
                <div className="create-con">
                    <Typography className='typ'>
                        Welcome
                    </Typography>
                    <span>Edit your blog</span>
                    <form onSubmit={editContent}>
                        <input type="number" name="id" value={id} hidden/>
                        <input type="text" name='heading' onChange={(e) => setheading(e.target.value)} value={heading} placeholder="Enter your blog's heading" />
                        <textarea name="content" cols="30" rows="10" onChange={(e) => setContent(e.target.value)} value={content} placeholder='Type content here...' />
                        <input type="text" name='tag' onChange={(e) => setTag(e.target.value)} value={tag} placeholder="Tags e.g.#tag1,#tag2" />
                        <button type='submit' style={isUploading ? { backgroundColor: 'gray', cursor: 'not-allowed' } : { backgroundColor: '#6EEB83' }} disabled={isUploading}>EDIT</button>
                    </form>
                    {/* {!err?<Snack cmd="open" text="Shared Successfully" />:<span></span>} */}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Editpage