import React, { createContext, useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
// import { Auth } from '@supabase/auth-ui-react';
import { useNavigate } from 'react-router-dom';


const supabase = createClient('https://ihexfffiwujwxafykxlf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloZXhmZmZpd3Vqd3hhZnlreGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE2NzMzMjQsImV4cCI6MjAwNzI0OTMyNH0.-E9ZNWR4I2WXP4PaX7lVYGNAEC_Z2nRFq4jZjfQNvMg');

const Authcontext = createContext();

export default Authcontext

const Authprovider = ({ children }) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate();
    const [err, setErr] = useState(false);
    const [errSignup, setErrSignup] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSent,setIsSent] = useState(false)

    const [user, setUser] = useState("");

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
            // console.log("Something went wrong!")
        }
        setUser("")
    }

    const TPsign = async () => {

        let { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google'
        })

        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
        // console.log(data)
    }

    let values = {
        signup: signup,
        signin: signin,
        user: user,
        logout: logout,
        TPsign: TPsign,
        err: err,
        errSignup: errSignup,
        isLoading: isLoading,
        isSent:isSent
    }

    return (
        <Authcontext.Provider value={values}>
            {children}
        </Authcontext.Provider>
    )
}

export { Authprovider };