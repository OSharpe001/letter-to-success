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

  const computerPlayerAmount=parseInt(props.settingsData.computer_player_amount);
  const computerPlayerNames=[];
  for (let i=0; i<computerPlayerAmount; i++) {
      computerPlayerNames.push("Computer "+(i+1))
  };
  const playerNames=[props.settingsData.player1_name, props.settingsData.player2_name, props.settingsData.player3_name, ...computerPlayerNames].filter(pName => pName!=="")
  
  const [isSpinning, setIsSpinning] = useState(false);
  const [turnCount, setTurnCount] = useState(0);
  const [players, setPlayers]= useState(playerNames.map(player => (
    {
      "name":player,
      "score":0,
      "prizes":[]
    }
  )));
  const [latestGuess, setLatestGuess] = useState("");
  const [latestGuessError, setLatestGuessError] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  // const computerPlayerAmount=parseInt(props.settingsData.computer_player_amount);
  // const computerPlayerNames=[];
  // for (let i=0; i<computerPlayerAmount; i++) {
  //     computerPlayerNames.push("Computer "+(i+1))
  // };

  // const playerNames=[props.settingsData.player1_name, props.settingsData.player2_name, props.settingsData.player3_name, ...computerPlayerNames].filter(pName => pName!=="")
  // const players=[];
  // playerNames.map(player => (
  //   players.push({
  //     "name":player,
  //     "score":0,
  //     "prizes":[]
  //   })
  // ))
  const consonants=["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"];
  const vowels=["A", "E", "I", "O", "U"];
  const allLetters= vowels + consonants;
  // let guessedLetters=["R", "S", "T", "L", "N", "E", ".", "'", "-", "&", "!"];
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
    console.log("GAMEPAGE.JS' CHANGESCORE PLAYER'S INFO: ", players[(turnCount)%(playerNames.length)])
    setPlayers(()=> {
      let newList=[...players];
      newList[(turnCount)%(playerNames.length)].score+=600;
      return newList
    })
      // ...players, players[(turnCount)%(playerNames.length)].score+=600)
  };

  const changePrizes = () => {
    console.log("GAMEPAGE.JS' CHANGEPRIZES PLAYER'S PRIZES: ", players[(turnCount)%(playerNames.length)].prizes)
    setPlayers(()=> {
      let newList=[...players];
      newList[(turnCount)%(playerNames.length)].prizes.push("A New Car");
      return newList
    })
  }

  const guessLetter= () => {
    if (guessedLetters.indexOf(latestGuess)<0) {
      setGuessedLetters(()=>{
        const newGuessedLetters=[...guessedLetters];
        newGuessedLetters.push(latestGuess);
        return newGuessedLetters;
      });
      setLatestGuess("");
    }
  };

  const handleLatestGuess = (e) => {
    e.target.value=e.target.value.toUpperCase()
    console.log("GAMEPAGE.JS HANDLELATESTGUESS' E.TARGET.VALUE: ", e.target.value)
    setLatestGuess(e.target.value)
    if (e.target.value==="" || e.target.value.length>1 || guessedLetters.indexOf(e.target.value)>-1) {
      setLatestGuessError("Choose a new single letter.");
    } else {
      setLatestGuessError("");
    };
  };

  const guessDisabled= latestGuessError;

  console.log("GAMEPAGE.JS' PLAYERS: ", players);
  console.log("GAMEPAGE.JS' GUESSEDLETTERS: ", guessedLetters);
  // console.log("GAMEPAGE.JS' PLAYERS2: ", players2);
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
            allLetters={allLetters}
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
        <button onClick={changePrizes} >Add to Prizes!</button>
        <br/>
        <label for="guess-letter">Guess a Letter</label>
        <input
        type="text"
        name="guess-letter"
        id="guess-letter"
        placeholder="Guess a Letter"
        value={latestGuess}
        onChange={handleLatestGuess}/>
        <button disabled={guessDisabled} onClick={guessLetter} >Guess a Letter!</button>
        <p>Latest Guess: {latestGuess}</p>
        {latestGuessError?<p className="error-message">{latestGuessError}</p>:null}
        <br/>
        <p>Current Player: {currentPlayer}</p>
        <p>Guessed Letters: {guessedLetters} </p>
        <Players
          players={players}
          currentPlayer={currentPlayer}
          />
    </>
  )
}
