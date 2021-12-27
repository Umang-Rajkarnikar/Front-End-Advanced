import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from "@firebase/firestore";
import { connectFirestoreEmulator, doc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFunctions, httpsCallable } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyCPlfU3AJjRT-k4FRxpdsoqPTPb_62q5J8",
  authDomain: "game-lobby-7999e.firebaseapp.com",
  projectId: "game-lobby-7999e",
  storageBucket: "game-lobby-7999e.appspot.com",
  messagingSenderId: "1086791368817",
  appId: "1:1086791368817:web:e4084806be48bf22bfdbd0"
};


  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);

  export const db = getFirestore(app);

  export const storage = getStorage(app);

  export const functions = getFunctions(app);

  export function useAuth() {
    const [currentUser, setCurrentUser] = useState()
    
    useEffect(() => {
      const unsub = onAuthStateChanged(auth, user => setCurrentUser(user))
      return unsub
    }, [])

    return currentUser
  }

  export async function upload(file, currentUser, setLoading){
    const fileRef = ref(storage, currentUser.uid + '.png')

    setLoading(true)
    
    const snapshot = await uploadBytes(fileRef, file)
    const photoURL = await getDownloadURL(fileRef)

    const player = doc(db, 'users', currentUser.uid)
    await updateDoc(player, { "image": photoURL })
    
    setLoading(false)
    
    alert("Uploaded file")

  }

  // connectFirestoreEmulator(db, 'localhost', 8090);