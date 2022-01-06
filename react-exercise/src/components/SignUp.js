import React from 'react'
import styles from '../App.module.css'
import { useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase-config.js"
import { useNavigate } from "react-router-dom"
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {

    const [registerEmail, setRegisterEmail] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useNavigate()

    function log_in_handler(){
        history("/login")
    }

    const register = async (e) => {
        e.preventDefault();
        try{
            setError("")
            setLoading(true)
            await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
            .then(async function () {
                const userUid = auth.currentUser.uid

                try {
                    const body = { 
                        uid: userUid,
                        player1: "none",
                        player2: "none",
                        player3: "none",
                        player4: "none",
                        image: '' 
                    };
                    
                    const response = fetch("http://localhost:5000/info", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body)
                    });
                    console.log(response)
                } catch (error) {
                    console.log(error)
                }
                
                // const playerRef = doc(db, 'users', userUid)                
                // setDoc(playerRef, {
                //   player1: "none",
                //   player2: "none",
                //   player3: "none",
                //   player4: "none",
                //   image: ''
                // })  
              }).then(() => {
                history("/profile")

              })

        }catch(error){
            setError("Failed to create an account")
            console.log(error.message);
        }
        setLoading(false)
    };
    return (

    <div className={styles.profile_container}>
        <div className={styles.Card2}>            
            <h1>Sign Up</h1>
                <form className="signup">
                    <label style={{float:"left"}} htmlFor="email">Email:</label>
                    <input 
                        type="email"
                        name="email" 
                        style={{float:"left", width:"100%"}} 
                        onChange={(event) => {
                            setRegisterEmail(event.target.value);
                        }}                    
                    />
                    <label style={{float:"left"}} htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        name="password" 
                        style={{float:"left", width:"100%"}} 
                        onChange={(event) => {
                            setRegisterPassword(event.target.value);
                        }} 
                    />
                    {error}
                    <button className={styles.btn} onClick={register}>Register</button>
                </form>
                <button className={styles.btn} onClick={log_in_handler}>Log in</button>
        </div>
    </div>
    )
}

export default SignUp
