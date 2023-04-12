// TODO:
// 1-SET A STATE TO KEEP TRACK OF WHEN THE WHEEL IS SPINNING TO APPLY
//    IT TO WHEEL AND POINTER
// 2-SET STATE TO KEEP TRACK OF PLAYERS' NAMES, SCORES AND PRIZES
// 3-SETUP A BETTER PUZZLE DESIGN WITH MORE WORDS ON A SINGLE LINE AND
//    A SET OF GREEN BACKGROUND BRICKS
// 4-SET STATE TO KEEP TRACK OF WHOSE TURN IT IS


import Board from "./components/Board";
import Wheel from "./components/Wheel";
import Pointer from "./components/Pointer";
import Players from "./components/Players";
import { useState } from "react";

export default function GamePage(props) {

  const [isSpinning, setIsSpinning] = useState(false);

  const computerPlayerAmount=parseInt(props.settingsData.computer_player_amount);
  const computerPlayerNames=[];

  for (let i=0; i<computerPlayerAmount; i++) {
      computerPlayerNames.push("Computer "+(i+1))
  };

  const playerNames=[props.settingsData.player1_name, props.settingsData.player2_name, props.settingsData.player3_name, ...computerPlayerNames].filter(pName => pName!=="")


  const letters=["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"];
  const vowels=["A", "E", "I", "O", "U"];
  const vowelCost= 250;

  

  const stopSpinning = () => {
    setIsSpinning(false);
  }
  const spinIt = () =>{
    setIsSpinning(!isSpinning);
    setTimeout(stopSpinning,5000);
  }

  // console.log("GAMEPAGE.JS' PROPS: ", props.settingsData);
  // console.log("GAMEPAGE.JS' PLAYERNAMES: ", playerNames)

  return (
    <>
        <h1>GamePage...</h1>
        <div className="game-page">
          <Board 
            puzzlePhrase={props.puzzlePhrase}
          />
          <Wheel
            isSpinning={isSpinning}
            />
          <Pointer
            isMoving={isSpinning}
            />
        </div>
        <button onClick={spinIt} >Spin It!</button>
        <Players
          playerNames={playerNames}
          />
    </>
  )
}
