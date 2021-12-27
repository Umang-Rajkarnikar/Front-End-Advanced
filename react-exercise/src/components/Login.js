import React from 'react'
import styles from '../App.module.css'
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config.js"
import { useNavigate } from "react-router-dom"

const Login = () => {

    const [loginEmail, setloginEmail] = useState("")
    const [loginPassword, setloginPassword] = useState("")
    // const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useNavigate()

    function sign_in_handler(){
        history("/")
    }

    const login_handler = async (e) => {
        e.preventDefault();
        try{
            setError("")
            setLoading(true)
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            history("/profile")
        }catch(error){
            setError("Failed to log in")
            console.log(error.message);
        }
        setLoading(false)

    };
    return (

        <div className={styles.profile_container}>
            <div className={styles.Card2}>  
                <h1>Log In</h1>
                <form className="signup">
                    <label htmlFor="email" style={{float:"left"}}>Email:</label>
                    <input 
                        type="email"
                        name="email"
                        style={{float:"left", width:"100%"}} 
                        onChange={(event) => {
                            setloginEmail(event.target.value);
                        }}                    
                    />
                    <label htmlFor="password" style={{float:"left"}}>Password:</label>
                    <input 
                        type="password" 
                        name="password" 
                        style={{float:"left", width:"100%"}} 
                        onChange={(event) => {
                            setloginPassword(event.target.value);
                        }} 
                    />
                    {error}
                    <button className={styles.btn} onClick={login_handler}>Login</button>
                </form>
                <button className={styles.btn} onClick={sign_in_handler}>Sign Up!</button>
            </div>
        </div>
    )
}

export default Login
