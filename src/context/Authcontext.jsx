import React, { createContext, useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
// import { Auth } from '@supabase/auth-ui-react';
import { useNavigate, useParams } from 'react-router-dom';
import Blogpage from '../pages/Blogpage';


const supabase = createClient('https://ihexfffiwujwxafykxlf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloZXhmZmZpd3Vqd3hhZnlreGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE2NzMzMjQsImV4cCI6MjAwNzI0OTMyNH0.-E9ZNWR4I2WXP4PaX7lVYGNAEC_Z2nRFq4jZjfQNvMg');

const Authcontext = createContext();

export default Authcontext

const SelectedBlog = () =>{
    const navigate = useNavigate()
    let userDet = {}
    const {id} = useParams()
    const [selected,setSelected] = useState([]);
    const [showIcon,setShowIcon] = useState(false)
    const getBlog = async()=>{
    let { data: blogs, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id',id)
      .maybeSingle()
    // console.log(blogs)
    setSelected(blogs)
    const { data: { user } } = await supabase.auth.getUser()
    if (blogs?.username === user?.email?.split('@')[0]) {
        setShowIcon(true)
    }else{
        setShowIcon(false)
    }
    }
    useEffect(()=>{
        getBlog()
    },[])

    const deleteBlog = async () => {
        try{
            const { error } = await supabase
            .from('blogs')
            .delete()
            .eq('id', id)
            navigate('/')
        }catch(error){
            console.log(error)
            alert("Something went wrong!")
        }
    }


    return(
        <Blogpage selected={selected} show={showIcon} delete={deleteBlog}/>
    )
}

const Authprovider = ({ children }) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate();
    const [err, setErr] = useState(false);
    const [errSignup, setErrSignup] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isUploading,setIsUploading] = useState(false)
    const [isSent,setIsSent] = useState(false)
    const [selected,setSelected] = useState();

    const [allBlogs,setAllBlogs] = useState([]);

    const [user, setUser] = useState("");
    const {id} = useParams()
    console.log(id)

    useEffect(() => {
        const getUserinfo = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
        }

        return () => getUserinfo()
    }, [])

    // console.log("From authcontext", user)

    const signup = async (e) => {
        e.preventDefault()
        // console.log(e.target.email.value,e.target.password.value)
        setIsSent(false)
        setIsLoading(true)
        let { data, error } = await supabase.auth.signUp({
            email: e.target.email.value,
            password: e.target.password.value
        })
        setIsLoading(false)
        if (!error) {
            setErrSignup(false)
            // console.log("Looking smooth")
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
            setIsSent(true)
        } else {
            // console.log(error)
            setErrSignup(true)
        }
    }

    const signin = async (e) => {
        e.preventDefault()
        // console.log("Clicked")
        setIsSent(false)
        setIsLoading(true)
        let { data, error } = await supabase.auth.signInWithPassword({
            email: e.target.email.value,
            password: e.target.password.value
        })
        setIsLoading(false)
        if (!error) {
            setErr(false)
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
            navigate('/')
        }
        else {
            setErr(true)
        }
    }

    const logout = async () => {
        // console.log("Clicked")
        let { error } = await supabase.auth.signOut()
        if (error) {
            console.log("Something went wrong!")
        }
        setUser("")
    }

    const TPsign = async () => {

        let { data, error } = await supabase.auth.signInWithOAuth({
             provider: 'facebook'
        })

        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
        console.log("Error in Third party Auth",error)
    }

    const getContent = async()=>{
        setIsLoading(true)
        let { data: blogs, error } = await supabase
        .from('blogs')
        .select('*')
        console.log(blogs)
        setAllBlogs(blogs?.reverse())
        setIsLoading(false)
        if (error) {
            alert("Something went wrong! Check your connectivity")
        }
    }

    const postBlog = async(e)=>{
    let [username,_] = []
    if (user) { 
        [username,_] = user?.email?.split('@')
    }
    e.preventDefault()
    setIsUploading(true)
    const { data, error } = await supabase
      .from('blogs')
      .insert([
        { heading: e.target.heading.value, content: e.target.content.value, username:username,tags:e.target.tag.value },
      ])
      .select()
    setIsUploading(false)
    if (error) {
      console.log(error)
      alert("Something went wrong! Check your connectivity")
      setErr(true)
    }else{
      navigate('/')
    }
  }

  const getBlog = async(id)=>{
    let { data: blogs, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id',id)
      .maybeSingle()
    // console.log(blogs)
    setSelected(blogs)
    }

  const editContent = async (e) => {
    e.preventDefault()
    try {    
        console.log(e.target.id.value)
        console.log("Heading",e.target.heading.value)
        console.log("content",e.target.content.value)
        console.log("tags",e.target.tag.value)
        setIsUploading(true)
        const { data, error } = await supabase
        .from('blogs')
        .update({ heading: e.target.heading.value, content: e.target.content.value, tags: e.target.tag.value })
        .eq('id', e.target.id.value)
        .select()
        setIsUploading(false)
        if (data) {
            console.log(data)
            navigate('/')
        }
    } catch (error) {
        console.log(error)
        alert("Something went wrong! Try again later")
    }
}

    // const [reactions,setReaction] = useState();

    // const getReact = async (id) =>{
    //     try {
    //         let { data: blogs, error } = await supabase
    //         .from('blogs')
    //         .select('reactions')
    //         .eq('id',id)
    //         .maybeSingle()
    //         // console.log(blogs?.reactions)
    //     //   setReaction(blogs?.reactions)
    //     } catch (error) {
            
    //     }
    // }


    // const reactPost = async(id,no) =>{
    //     setReaction(no)
    //     const { data, error } = await supabase
    //     .from('blogs')
    //     .update(
    //       { reactions: no},
    //     )
    //     .eq('id',id)
    //     .select()
    // }

    // useEffect(()=>{
    //     getReact()
    // },[reactions])


    let values = {
        signup: signup,
        signin: signin,
        user: user,
        logout: logout,
        TPsign: TPsign,
        err: err,
        errSignup: errSignup,
        isLoading: isLoading,
        isSent:isSent,
        allBlogs:allBlogs,
        getContent:getContent,
        postBlog:postBlog,
        isUploading:isUploading,
        getBlog:getBlog,
        editContent:editContent,
        selected:selected,
    }

    return (
        <Authcontext.Provider value={values}>
            {children}
        </Authcontext.Provider>
    )
}

export { Authprovider,SelectedBlog };