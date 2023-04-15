// COULDN'T GET USEREDUCER TO HELP.

// TODO:
// 
// 2-SET STATE TO KEEP TRACK OF PLAYERS' NAMES, SCORES AND PRIZES
// 3-SETUP A BETTER PUZZLE DESIGN WITH MORE WORDS ON A SINGLE LINE AND
//    A SET OF GREEN BACKGROUND BRICKS

import { WheelSegments } from "./assets/wheelSegments";
import Board from "./components/Board";
import Wheel from "./components/Wheel";
import Pointer from "./components/Pointer";
import Players from "./components/Players";
import { useState, useReducer, /*useEffect*/ } from "react";

const reducer1 = (state, action) => {
  if (action.type ==="bankrupt") {console.log("REDUCER1 STATE: ", state); console.log("REDUCER1 ACTION: ", action); return (state[action.payload.player].score=0, state[action.payload.player].prizes=[])};
  if (action.type ==="correct" && !!(action.payload.prize))  {
    console.log("REDUCER1 STATE: ", state);
    console.log("REDUCER1 ACTION: ", action);
    state[action.payload.player].score+=action.payload.cash;
    state[action.payload.player].prizes.push(action.payload.prize);
    return state;
    };
  if (action.type ==="correct" && !(action.payload.prize))  {
    console.log("REDUCER1 INFO TO CHANGE SCORE:",state[action.payload.player].score);
    console.log("REDUCER1 STATE: ", state);
    console.log("REDUCER1 ACTION.PAYLOAD: ", action.payload);
    state[action.payload.player].score+=action.payload.cash;
    return state
  };
  return state
}/** */

export default function GamePage(props) {

  const computerPlayerAmount=parseInt(props.settingsData.computer_player_amount);
  const computerPlayerNames=[];
  for (let i=0; i<computerPlayerAmount; i++) {
      computerPlayerNames.push("Computer "+(i+1))
  };
  const playerNames=[props.settingsData.player1_name, props.settingsData.player2_name, props.settingsData.player3_name, ...computerPlayerNames].filter(pName => pName!=="")
  
  const [wheelInfo, setWheelInfo] = useState(["", 0, false])
  const [latestConsonant, setLatestConsonant] = useState("");
  const [latestVowel, setLatestVowel] = useState("");
  const [latestGuessError, setLatestGuessError] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [turnCount, setTurnCount] = useState(0);
  const currentPlayer = playerNames[(turnCount)%(playerNames.length)];

  const initialPlayers2 = playerNames.map(player => (
    {
      "name":player,
      "score":0,
      "prizes":[]
    }
    ));
  const [players2, dispatch] = useReducer(reducer1, initialPlayers2);
  const [players, setPlayers]= useState(playerNames.map(player => (
    {
      "name":player,
      "score":0,
      "prizes":[]
    }
  )));

  const consonants=["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"];
  const vowels=["A", "E", "I", "O", "U"];
  const allLetters= vowels + consonants;
//   const vowelCost= 250;

  const stopSpinning = () => {
    setIsSpinning(false);
  }
  const spinIt = () =>{
    setIsSpinning(!isSpinning);
    setTimeout(stopSpinning,5000);
    setWheelInfo(()=>{
      const newSpin=WheelSegments[Math.floor(Math.random()*WheelSegments.length)];
      if (newSpin.type==="bankrupt") {
          console.log("NEWSPIN WAS A 'BANKRUPT'")
          dispatch({type: "bankrupt", payload:{player:(turnCount)%(playerNames.length)}})
          setPlayers(()=> {
            let newList=[...players];
            newList[(turnCount)%(playerNames.length)].score=0;
            newList[(turnCount)%(playerNames.length)].prizes=[];
            setWheelInfo(["", 0, false]);
            return newList
          });
          changeTurn();
        }
        if (newSpin.type==="loseturn") {
          console.log("NEWSPIN WAS A 'LOSETURN'")
          changeTurn();
      }
      return [newSpin.type, newSpin.value, newSpin.prize]
    },
    )
  }

  const changeTurn = () => {
    setTurnCount(turnCount+1)
  }

  const changeScore = () => {
    console.log("GAMEPAGE.JS' CHANGESCORE PLAYER'S INFO: ", players[(turnCount)%(playerNames.length)]);
    dispatch({type: "correct", payload:{player:(turnCount)%(playerNames.length), cash:wheelInfo[1], prize:wheelInfo[2]}})
    setPlayers(()=> {
      let newList=[...players];
      newList[(turnCount)%(playerNames.length)].score+=wheelInfo[1];
      if (wheelInfo[2]) {
        newList[(turnCount)%(playerNames.length)].prizes.push(wheelInfo[2])
      };
      setWheelInfo(["", 0, false]);
      return newList
    })
  };

  const guessLetter = () => {
    if (guessedLetters.indexOf(latestConsonant)<0 && latestConsonant!=="") {
      setGuessedLetters(()=>{
        const newGuessedLetters=[...guessedLetters];
        newGuessedLetters.push(latestConsonant);
        return newGuessedLetters;
      });
      setLatestConsonant("");
    } else if (guessedLetters.indexOf(latestVowel)<0 && latestVowel!=="") {
      setGuessedLetters(()=>{
        const newGuessedLetters=[...guessedLetters];
        newGuessedLetters.push(latestVowel);
        return newGuessedLetters;
      });
      setLatestVowel("");
    }
  };

  const handleConsonantGuess = (e) => {
    e.target.value=e.target.value.toUpperCase();
    // console.log("GAMEPAGE.JS HANDLECONSONANTGUESS' E.TARGET.VALUE: ", e.target.value)
    setLatestConsonant(e.target.value)
    if (consonants.indexOf(e.target.value)<0) {
      setLatestGuessError("Choose a consonant.")
    } else if (e.target.value==="" || e.target.value.length>1 || guessedLetters.indexOf(e.target.value)>-1) {
      setLatestGuessError("Choose a new single consonant.");
    } else if (vowels.indexOf(e.target.value)>-1) {
      setLatestGuessError("Please choose a consonent.")
    }else {
      setLatestGuessError("");
    };
  };

  const handleVowelGuess = (e) => {
    e.target.value=e.target.value.toUpperCase();
    // console.log("GAMEPAGE.JS HANDLEVOWELGUESS' E.TARGET.VALUE: ", e.target.value)
    setLatestVowel(e.target.value)
    if (vowels.indexOf(e.target.value)<0) {
      setLatestGuessError("Choose a vowel.")
    } else if (e.target.value==="" || e.target.value.length>1 || guessedLetters.indexOf(e.target.value)>-1) {
      setLatestGuessError("Choose a new single Vowel.");
    } else if (consonants.indexOf(e.target.value)>-1) {
      setLatestGuessError("Please choose a Vowel.")
    }else {
      setLatestGuessError("");
    };
  };

  const guessDisabled= latestGuessError;

  // console.log("GAMEPAGE.JS' RANDOM WHEELSEGMENT: ", WheelSegments[Math.floor(Math.random()*WheelSegments.length)]);
  // console.log("GAMEPAGE.JS WHEELSEGMENTS' RANDOM NUMBER: ", Math.floor(Math.random()*WheelSegments.length));
  console.log("GAMEPAGE.JS' PLAYERS: ", players);
  console.log("GAMEPAGE.JS' PLAYERS2: ", players2);
  // console.log("GAMEPAGE.JS' GUESSEDLETTERS: ", guessedLetters);
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
        <p>Type: {wheelInfo[0]}</p>
        <p>Value: {wheelInfo[1]}</p>
        <p>Prize: {wheelInfo[2]}</p>
        <button onClick={changeTurn} >Change Turn!</button>
        <br/>
        <button onClick={changeScore} >Add to Score!</button>
        {/* <button onClick={changePrizes} >Add to Prizes!</button> */}
        <br/>
        <label htmlFor="guess-consonant">Guess a Consonant</label>
        <input
        type="text"
        name="guess-consonant"
        id="guess-consonant"
        placeholder="Guess a Consonant"
        value={latestConsonant}
        onChange={handleConsonantGuess}/>
        <br/>
        <label htmlFor="guess-vowel">Guess a Vowel</label>
        <input
        type="text"
        name="guess-vowel"
        id="guess-vowel"
        placeholder="Guess a Vowel"
        value={latestVowel}
        onChange={handleVowelGuess}/>
        <br/>
        <button disabled={guessDisabled} onClick={guessLetter} >Guess a Letter!</button>
        
        {latestGuessError?<p className="error-message">{latestGuessError}</p>:null}
        
        {/* <p>Latest Consonant: {latestConsonant}</p> */}
        {/* <p>Latest Vowel: {latestVowel}</p> */}
        
        <br/>
        {/* <p>Current Player: {currentPlayer}</p> */}
        <p>Guessed Letters: {guessedLetters} </p>
        <Players
          players={players}
          currentPlayer={currentPlayer}
          />
    </>
  )
}
