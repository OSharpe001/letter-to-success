// TODO:
// 
// 2-SET STATE TO KEEP TRACK OF PLAYERS' NAMES, SCORES AND PRIZES
// 3-SETUP A BETTER PUZZLE DESIGN WITH MORE WORDS ON A SINGLE LINE AND
//    A SET OF GREEN BACKGROUND BRICKS


import Board from "./components/Board";
import Wheel from "./components/Wheel";
import Pointer from "./components/Pointer";
import Players from "./components/Players";
import { useState } from "react";

export default function GamePage(props) {

  const [isSpinning, setIsSpinning] = useState(false);
  const [turnCount, setTurnCount] = useState(0);

  const computerPlayerAmount=parseInt(props.settingsData.computer_player_amount);
  const computerPlayerNames=[];
  for (let i=0; i<computerPlayerAmount; i++) {
      computerPlayerNames.push("Computer "+(i+1))
  };

  const playerNames=[props.settingsData.player1_name, props.settingsData.player2_name, props.settingsData.player3_name, ...computerPlayerNames].filter(pName => pName!=="")
  const players=[];
  playerNames.map(player => {
    players.push({
      "name":player,
      "score":0,
      "prizes":[]
    })
  })
  const letters=["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"];
  const vowels=["A", "E", "I", "O", "U"];
  let guessedLetters=[/*"R", "S", "T", "L", "N", "E"*/".", "'", "-", "&", "!"];
  const vowelCost= 250;
  const currentPlayer = playerNames[(turnCount)%(playerNames.length)];

  const stopSpinning = () => {
    setIsSpinning(false);
  }
  const spinIt = () =>{
    setIsSpinning(!isSpinning);
    setTimeout(stopSpinning,5000);
  }

  const changeTurn = () => {
    setTurnCount(turnCount+1)
  }

  const changeScore = () => {
    console.log("GAMEPAGE.JS' CHANGESCORE PLAYER'S SCORE: ", players[(turnCount)%(playerNames.length)])
    players[(turnCount)%(playerNames.length)].score+=600
  }

  console.log("GAMEPAGE.JS' PLAYERS: ", players);
  // console.log("GAMEPAGE.JS' TURNCOUNT: ", turnCount);
  // console.log("GAMEPAGE.JS' PROPS: ", props.settingsData);
  // console.log("GAMEPAGE.JS' PLAYERNAMES: ", playerNames);

  return (
    <>
        <h1>GamePage...</h1>
        <div className="game-page">
          <Board
            puzzlePhrase={props.puzzlePhrase}
            puzzleType={props.puzzleType}
            guessedLetters={guessedLetters}
          />
          <Wheel
            isSpinning={isSpinning}
            />
          <Pointer
            isMoving={isSpinning}
            />
        </div>
        <button onClick={spinIt} >Spin It!</button>
        <br/>
        <button onClick={changeTurn} >Change Turn!</button>
        <br/>
        <button onClick={changeScore} >Add to Score!</button>
        <br/>
        {turnCount}
        <br/>
        {currentPlayer}
        <Players
          playerNames={playerNames}
          players={players}
          currentPlayer={currentPlayer}
          />
    </>
  )
}
