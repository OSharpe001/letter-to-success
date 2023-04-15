// TODO:
// 3-SETUP A BETTER PUZZLE DESIGN WITH MORE WORDS ON A SINGLE LINE AND
//    A SET OF GREEN BACKGROUND BRICKS
// 4-NEED TO TIE SCORE TOGETHER WITH CORRECT CONSONANT GUESSES AND A LOSETURN PENALTY FOR WRONG GUESSES.
// 5-NEED TO TIE A $250 COST TO BUYING A VOWEL AND A LOSETURN PENALTY FOR WRONG GUESSES.

import { WheelSegments } from "./assets/wheelSegments";
import Board from "./components/Board";
import Wheel from "./components/Wheel";
import Pointer from "./components/Pointer";
import Players from "./components/Players";
import { useState/*, useEffect */} from "react";

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
  const [players, setPlayers]= useState(playerNames.map(player => (
    {
      "name":player,
      "score":0,
      "prizes":[]
    }
  )));

  const consonants=["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"];
  const vowels=["A", "E", "I", "O", "U"];
  const allLetters= [...consonants, ...vowels];
  const loserLetters=allLetters.filter(letter=>props.puzzlePhrase.indexOf(letter)<0);
  /**/
  // const vowelCost= 250;
  const currentPlayer = playerNames[(turnCount)%(playerNames.length)];

  const stopSpinning = () => {
    setIsSpinning(false);
  }
  const spinIt = () =>{
    setIsSpinning(!isSpinning);
    setTimeout(stopSpinning,5000);
    const newSpin=WheelSegments[Math.floor(Math.random()*WheelSegments.length)];
    if (newSpin.type==="bankrupt") {
        console.log("NEWSPIN WAS A 'BANKRUPT'")
        let newList=[...players];
        newList[(turnCount)%(playerNames.length)].score=0;
        newList[(turnCount)%(playerNames.length)].prizes=[];
        setWheelInfo(["", 0, false]);
        setPlayers(newList)
        changeTurn();
        setWheelInfo(["", 0, false]);
        return
      }
    if (newSpin.type==="loseturn") {
      console.log("NEWSPIN WAS A 'LOSETURN'")
      changeTurn();
      setWheelInfo(["", 0, false]);
      return
    }
    setWheelInfo([newSpin.type, newSpin.value, newSpin.prize])
  }

  const changeTurn = () => {
    setTurnCount(turnCount+1)
  }

  const changeScore = () => {
    // console.log("GAMEPAGE.JS' CHANGESCORE PLAYER'S INFO: ", players[(turnCount)%(playerNames.length)])
  let newList=[...players];
    newList[(turnCount)%(playerNames.length)].score+=wheelInfo[1];
    if (wheelInfo[2]) {
      newList[(turnCount)%(playerNames.length)].prizes.push(wheelInfo[2])
    };
    setWheelInfo(["", 0, false]);
    setPlayers(newList)
  };

  const guessLetter = () => {
    if (guessedLetters.indexOf(latestConsonant)<0 && latestConsonant!=="") {
      setGuessedLetters(()=>{
        const newGuessedLetters=[...guessedLetters];
        newGuessedLetters.push(latestConsonant);
        return newGuessedLetters;
      });
      if (loserLetters.indexOf(latestConsonant)<0) {
        changeScore();
      } else {
        changeTurn();
      }
      // SET UP AN IF-STATEMENT TO CHANGESCORE IF THE CONSONANT WAS CORRECT
      // SET UP AN ELSE-IF STATEMENT TO CHANGETURN IF THE CONSONANT WAS IN LOSERLETTERS
      setLatestConsonant("");
    } else if (guessedLetters.indexOf(latestVowel)<0 && latestVowel!=="") {
      setGuessedLetters(()=>{
        const newGuessedLetters=[...guessedLetters];
        newGuessedLetters.push(latestVowel);
        return newGuessedLetters;
      });
      if (loserLetters.indexOf(latestVowel)<0) {
        changeTurn();
      }
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
  // console.log("GAMEPAGE.JS' GUESSEDLETTERS: ", guessedLetters);
  // console.log("GAMEPAGE.JS' PLAYERS2: ", players2);
  // console.log("GAMEPAGE.JS' TURNCOUNT: ", turnCount);
  // console.log("GAMEPAGE.JS' PROPS.SETTINGSDATA: ", props.settingsData);
  // console.log("GAMEPAGE.JS' PLAYERNAMES: ", playerNames);
  // console.log("ALLLETTERS: ", allLetters);
  // console.log("GAMEPAGE.JS' PROPS: ", props);
  console.log("GAMEPAGE.JS' PLAYERS: ", players);
  // console.log("GAMEPAGE.JS' LOSERLETTERS: ", loserLetters);

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
