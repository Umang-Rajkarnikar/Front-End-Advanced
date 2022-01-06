import React from 'react'
import styles from '../App.module.css';
import Card from './Card';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { auth } from "../firebase-config.js"
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";


const Lobby = () => {
 
    const history = useNavigate()
    const [loading, setLoading] = useState(false)
    const [playerID, setPlayerID] = useState([
      {
        pID: '1',
        color: "none"
      },
      {
        pID: '2',
        color: "none"
      },
      {
        pID: '3',
        color: "none"
      },
      {
        pID: '4',
        color: "none"
      },
    ])

    const [colors, setColors] = useState([
      {
        value: "Choose card color",
        selected: 'false',
        pID: '0'
      },
      {
        value: "Blue",
        selected: 'false',
        pID: '0'
      },
      {
        value: "Red",
        selected: 'false',
        pID: '0'
      },
      {
        value: "Orange",
        selected: 'false',
        pID: '0'
      },
      {
        value: "Green",
        selected: 'false',
        pID: '0'
      },
    ]);


    function handle_profile() {
      history("/profile")
    }

    async function handle_logout() {
      await signOut(auth)
      history("/login")
    }  

    useEffect(() => {
      let isActive = true;
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user && isActive){
          console.log("fhulag")
          setLoading(false)
          fetchData(user.uid)
        } else{
          console.log("it's null")
        }
      });
      return () => {
        isActive = false;
        unsubscribe();
      };
    }, [])

    useEffect(() => {
      const color_Array = []
      for (const color of colors){        
        color_Array.push(color)
      }
      for (const player of playerID){   
        for (const color of color_Array){        
          if (color.value !== "Choose card color" && color.value.toLowerCase() === player.color && player.color !== "Choose card color"){
            color.pID = player.pID;
            color.selected = 'true';
            break;
          }
        }
      }


      setColors(color_Array)
      setLoading(true)

    }, [playerID]);

    const fetchData = async (uid) =>{
      if(uid!=undefined){
        const response = await fetch(`http://localhost:5000/info/${uid}`);
        const data = await response.json();
        
        const playerData = {
          player1: data.player1,
          player2: data.player2,
          player3: data.player3,
          player4: data.player4
        }
        setUpdatedItems(playerData)

      }
    }

    function setUpdatedItems(data){
      setPlayerID([
        {
          pID: '1',
          color: data.player1
        },
        {
          pID: '2',
          color: data.player2
        },
        {
          pID: '3',
          color: data.player3
        },
        {
          pID: '4',
          color: data.player4
        },
      ])
    }
         
    
      const setItems = (value, pID_1) => {
        setColors(
          colors.map((color) => 
            color.value !== value && color.selected === 'true' && color.pID === pID_1 ? 
            {...color, selected: 'false', pID: '0'} :
            color.value === "Choose card color" ? {...color, selected: 'false', pID: 0} :
            color.value === value ? {...color, selected: 'true', pID: pID_1}
            : color
            )
        )
      }
    
      const getColors = (pID) => {
        return colors.filter((color) =>
          (color.selected === 'false') || (pID === color.pID)
        )
      }

    
      const setCardColor = (value, pID) => {
        setPlayerID(
          playerID.map((player) => 
          value === "Choose card color" && player.pID === pID ? {...player, color: '#7a8a8f'} :
          player.pID === pID ? {...player, color: value} 
          : player
          )
        )
      }

    return (
      <>
        <div className={styles.container}>
            <h1>Game Lobby</h1>
            <div className={styles.grid}>
            {playerID.map((player) => (
                <div className={styles.item}>
                  <Card player={player} pID={player.pID} colors={getColors(player.pID)} onItems={setItems} onCardColor={setCardColor}/>
                </div>
            ))}
            </div>
        </div>
        <div className={styles.buttons}>
          <button className={styles.btn} onClick={handle_profile}>Profile</button>
          <button className={styles.btn} onClick={handle_logout}>Logout</button>
        </div>
        
      </>
    )
}

export default Lobby
