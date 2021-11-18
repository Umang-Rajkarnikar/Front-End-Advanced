import './App.css';
import { blue } from '@material-ui/core/colors';
import Card from './components/Card';
import Grid from '@material-ui/core/Grid';
import { orange, green, yellow, red } from '@material-ui/core/colors';
import { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";


const App = () => {

  const [playerID, setPlayerID] = useState([
    {
      pID: '1',
      color: 'none'
    },
    {
      pID: '2',
      color: 'none'
    },
    {
      pID: '3',
      color: 'none'
    },
    {
      pID: '4',
      color: 'none'
    },
  ])
  
  const [colors, setColors] = useState([
    {
      id: "none",
      value: "Choose card color",
      selected: 'false',
      pID: '0'
    },
    {
      id: "blue",
      value: "Blue",
      selected: 'false',
      pID: '0'
    },
    {
      id: "red",
      value: "Red",
      selected: 'false',
      pID: '0'
    },
    {
      id: "orange",
      value: "Orange",
      selected: 'false',
      pID: '0'
    },
    {
      id: "green",
      value: "Green",
      selected: 'false',
      pID: '0'
    },
  ]);

  const setItems = (value, pID_1) => {
    setColors(
      colors.map((color) => 
        color.value === "Choose card color" ? {...color, selected: 'false', pID: 0} :
        color.value === value ? {...color, selected: 'true', pID: pID_1} :
        color.value !== value && color.selected === 'true' && color.pID === pID_1 ? 
        {...color, selected: 'false', pID: '0'} 
        : color
        )
    )
  }

  const getColors = (pID) => {
    return colors.filter((color) =>
      (color.selected === 'false') || (pID == color.pID)
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
    <div className="App">
      <header className="App-header">
        <h1>Game Lobby</h1>
        <Grid className="card-container" container spacing={2} justify="center">
          {playerID.map((player) => (
            <Grid item sm={6}>
              <Card player={player} colors={getColors(player.pID)} pID={player.pID} onItems={setItems} onCard={setCardColor}/>
            </Grid>
          ))}
        </Grid>
      </header>
    </div>
  );
}

export default App;
