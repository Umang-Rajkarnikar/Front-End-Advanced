import styles from '../App.module.css';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { FormControl, InputLabel } from '@material-ui/core';
import { useState } from 'react';
import { auth, db } from "../firebase-config.js"
import { doc, updateDoc } from "firebase/firestore";

const Card = ({ colors, onItems, player, onCardColor, pID }) => {

  var [selected, setSelected] = useState();
  function handleChange(event) {
    setSelected(event.target.value)
    onItems(event.target.value, player.pID)
    onCardColor(event.target.value, player.pID)
    storeColor(event.target.value.toLowerCase())

  }

  async function storeColor(color) {
    const body = { 
      item: color,
      playerNum: pID,
      isImage: false
    }
    await fetch(`http://localhost:5000/info/${auth.currentUser.uid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    console.log("das")
  }

  return (
    <div className={styles.Card} style={{backgroundColor: player.color}}>
        <h1>Player {player.pID}</h1>
        <hr/>
        <FormControl>
          <InputLabel htmlFor="agent-simple">Selection</InputLabel>
            <Select
            value={selected}
            onChange={handleChange}
            >
              {colors.map((color) => {
                return <MenuItem value={color.value}>{color.value}</MenuItem>;
              })}
            </Select>
        </FormControl>
    </div>
  );
}

export default Card;
