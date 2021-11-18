import '../App.css';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { FormControl, InputLabel } from '@material-ui/core';
import { useState, useEffect } from 'react';

const Card = ({ colors, pID, onItems, player, onCard }) => {
  
  const [selected, setSelected] = useState("Choose card color");

  function handleChange(event) {
    setSelected(event.target.value)
    onItems(event.target.value, pID)
    onCard(event.target.value, pID)
    console.log(event.target.value)
  }

  return (
    <div className="Card" style={{backgroundColor: player.color}}>
        <h1>Player {pID}</h1>
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
