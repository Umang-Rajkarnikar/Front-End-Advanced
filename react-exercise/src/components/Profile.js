import styles from '../App.module.css';
import { useState, useEffect } from 'react';
import { auth, db } from "../firebase-config.js"
import { doc, getDoc } from "firebase/firestore";
import { useAuth, upload } from '../firebase-config.js';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";


const Profile = () => {
    const currentUser = useAuth();
    const [photo, setPhoto] = useState(false);
    const [loading, setLoading] = useState();
    const [photoURL, setPhotoURL] = useState("https://iupac.org/wp-content/uploads/2018/05/default-avatar.png");
    const history = useNavigate()

    // Runs when file is uploaded
    // Sets photo to image uploaded
    function handleChange(e){
        if(e.target.files[0]){
            setPhoto(e.target.files[0])
            console.log(currentUser.uid, "photo")
        }
    }

    async function handle_logout() {
        await signOut(auth)
        history("/login")
    }  

    // Runs when button is clicked; uploads photo to fire storage
    function handleClick(){
        upload(photo, currentUser, setLoading)
    }

    useEffect(() => {
        if(currentUser){
            console.log(currentUser.uid)
            foo()
        }
    }, [currentUser])

    const foo = async() => {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef)
        const data = docSnap.data();
        console.log(data)
        if(data.image !== ""){
            setPhotoURL(data.image)
        }
        
    }

    function handleLobby() {
        history("/lobby")
    }
    
    return (
    <div className={styles.profile_container}>
        <div className={styles.Card2}>
            <h1>Profile</h1>
            <img src={photoURL} alt="Avatar" className={styles.avatar} style={{maxWidth:"100px", borderRadius:"100%"}}></img>
            <input type="file" onChange={handleChange}></input>
            <button className={styles.btn} disabled={loading || !photo} onClick={handleClick}>Upload</button>
            <button className={styles.btn} onClick={handleLobby}>Lobby</button>
            <button className={styles.btn} onClick={handle_logout}>Logout</button>
        </div>
    </div>
    );
}

export default Profile;
