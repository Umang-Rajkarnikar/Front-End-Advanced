import styles from '../App.module.css';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { FormControl, InputLabel } from '@material-ui/core';
import { useState } from 'react';
import { auth, db } from "../firebase-config.js"
import { doc, updateDoc } from "firebase/firestore";

const Card = ({ colors, onItems, player, onCardColor, pID }) => {
  console.log(player.color)

  var [selected, setSelected] = useState();
  function handleChange(event) {
    storeColor(event.target.value.toLowerCase())
    setSelected(event.target.value)
    onItems(event.target.value, player.pID)
    onCardColor(event.target.value, player.pID)
  }

  async function storeColor(color) {
    const player = doc(db, 'users', auth.currentUser.uid);
    if(pID === '1'){
      await updateDoc(player, { "player1": color})
    }
    else if(pID === '2'){
      await updateDoc(player, { "player2": color})

    }
    else if(pID === '3'){
      await updateDoc(player, { "player3": color})
    }
    else if(pID === '4'){
      await updateDoc(player, { "player4": color})
    }
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
