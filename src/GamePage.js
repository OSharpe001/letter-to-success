// TODO:
// 5-SETUP A BETTER PUZZLE DESIGN WITH MORE WORDS ON A SINGLE LINE AND
//    A SET OF GREEN BACKGROUND BRICKS
// 6-NEED TO SET UP FUNCTIONS TO GUESS THE PUZZLE


import { WheelSegments } from "./assets/wheelSegments";
import Board from "./components/Board";
import Wheel from "./components/Wheel";
import Pointer from "./components/Pointer";
import Players from "./components/Players";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  const [statusMessage, setStatusMessage] = useState("");
  const [vowelInterface, setVowelInterface] = useState(false);
  const [noMoreVowels, setNoMoreVowels] = useState(false);
  const [noMoreConsonants, setNoMoreConsonants] = useState(false);
  const [attemptToSolve, setAttemptToSolve] = useState(false);
  const [guessPuzzle, setGuessPuzzle] = useState("");
  const [guessPuzzleError, setGuessPuzzleError] = useState("");
  const [players, setPlayers]= useState(playerNames.map(player => (
    {
      "name":player,
      "score":0,
      "prizes":[]
    }
  )));

  const navigate = useNavigate();
  const autoReset = useEffect;
  autoReset(()=> {
    // console.log('THE USEEFFECT HOOK "AUTORESET" WAS JUST TRIGGERRED');
    if (!players[1].name) {
      setPlayers([{},])
      navigate("/settings")
    }
  },players)


  const consonants = ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"];
  const vowels = ["A", "E", "I", "O", "U"];
  const allLetters = [...consonants, ...vowels];
  const puzzleLetters = props.puzzlePhrase.split("").filter(letter=>allLetters.indexOf(letter)>-1);
  const consonantMultiplier = (puzzleLetters.filter(letter=>letter===latestConsonant)).length;
  const vowelMultiplier= (puzzleLetters.filter(letter=>letter===latestVowel)).length;
  const wheelValue = wheelInfo[1];
  const wheelPrize = wheelInfo[2];
  const vowelCost= 250;

  const currentPlayerNumber = [(turnCount)%(playerNames.length)];
  const currentPlayer = players[currentPlayerNumber];
  const nextPlayer = players[(turnCount+1)%(playerNames.length)]

  const stopSpinning = () => {
    setIsSpinning(false);
  }
  const spinIt = () =>{
    setStatusMessage("");
    setIsSpinning(!isSpinning);
    setTimeout(stopSpinning,5000);
    const newSpin=WheelSegments[Math.floor(Math.random()*WheelSegments.length)];
    setTimeout(setWheelInfo, 5000, [newSpin.type, newSpin.value, newSpin.prize]);
    const badNews= ()=> {
        if (newSpin.type==="bankrupt") {
          // console.log("NEWSPIN WAS A 'BANKRUPT'")
          setStatusMessage(`${currentPlayer.name} just went BANKRUPT! (OUCH!)`);
          let newList=[...players];
          newList[currentPlayerNumber].score=0;
          newList[currentPlayerNumber].prizes=[];
          setPlayers(newList)
          changeTurn();
          return
        }
      if (newSpin.type==="loseturn") {
        setStatusMessage(`${currentPlayer.name} just lost their turn! (sorry...)`);
        // console.log("NEWSPIN WAS A 'LOSETURN'")
        changeTurn();
        return
      }
    }
    setTimeout(badNews, 5500);
    // setWheelInfo([newSpin.type, newSpin.value, newSpin.prize])
  }

  const changeTurn = () => {
    setTurnCount(turnCount+1);
    setTimeout(setStatusMessage, 1750, `It's your turn, ${nextPlayer.name}`);
    setWheelInfo(["", 0, false]);
  }

  const changeScore = () => {
    // console.log("GAMEPAGE.JS' CHANGESCORE PLAYER'S INFO: ", players[currentPlayerNumber])
  let newList=[...players];
    newList[currentPlayerNumber].score+=(wheelValue*consonantMultiplier);
    if (wheelPrize) {
      newList[currentPlayerNumber].prizes.push(wheelPrize)
    };
    setWheelInfo(["", 0, false]);
    setPlayers(newList)
  };

  const guessLetter = () => {
    if (guessedLetters.indexOf(latestConsonant)<0 && latestConsonant!=="") {
      setGuessedLetters(()=>{
        const newGuessedLetters=[...guessedLetters];
        newGuessedLetters.push(latestConsonant);
        newGuessedLetters.sort();
        if (consonants.every(consonant=>newGuessedLetters.indexOf(consonant)>=0)) {
          
          setNoMoreConsonants(true);
          setTimeout(setStatusMessage, 3000, "There are no more consonants...");
        } else if (puzzleLetters.every(letter=>newGuessedLetters.indexOf(letter)>=0)) {
          props.setWinner(currentPlayer);
          setStatusMessage(`${currentPlayer.name} HAS WON!!!`);
          // setTimeout(navigate, 8000, "/results");
          navigate("/results");
        };
        return newGuessedLetters;
      });
      if (puzzleLetters.indexOf(latestConsonant)>=0) {
        changeScore();
        (consonantMultiplier>1?setStatusMessage(`There are ${consonantMultiplier} ${latestConsonant}'s!`):setStatusMessage(`There is 1 ${latestConsonant}.`));
      } else {
        setStatusMessage(`There are no ${latestConsonant}'s. (sorry...)`);
        changeTurn();
      }
      setLatestConsonant("");
    } else if (guessedLetters.indexOf(latestVowel)<0 && latestVowel!=="") {
      setGuessedLetters(()=>{
        const newGuessedLetters=[...guessedLetters];
        newGuessedLetters.push(latestVowel);
        newGuessedLetters.sort();
        if (vowels.every(vowel=>newGuessedLetters.indexOf(vowel)>=0)) {
          setNoMoreVowels(true);
          setTimeout(setStatusMessage, 3000, "There are no more vowels...");
        } else if (puzzleLetters.every(letter=>newGuessedLetters.indexOf(letter)>=0)) {
          props.setWinner(currentPlayer);
          setStatusMessage(`${currentPlayer.name} HAS WON!!!`);
          // setTimeout(navigate, 8000, "/results");
          navigate("/results");
        };
        return newGuessedLetters;
      });
      if (puzzleLetters.indexOf(latestVowel)<0) {
        setStatusMessage(`There are no ${latestVowel}'s. (sorry...)`);
        changeTurn();
      // } else if (){

      } else {
        (vowelMultiplier>1?setStatusMessage(`There are ${vowelMultiplier} ${latestVowel}'s!`):setStatusMessage(`There is 1 ${latestVowel}.`));
      }
      setVowelInterface(false)
      setLatestVowel("");
    }
  };

  const buyVowel = () => {
    let newList=[...players];
    newList[currentPlayerNumber].score-=vowelCost;
    setPlayers(newList);
    setVowelInterface(true);
  }
  // **
  const solveIt = () => {
    // console.log("GAMEPAGE.JS' SOLVEIT IN PROGRESS");
    setAttemptToSolve(true);
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

  // **
  const handlePuzzleGuess = (e) => {
    e.target.value=e.target.value.toUpperCase();
    // console.log("GAMEPAGE.JS HANDLEPUZZLEGUESS' E.TARGET.VALUE: ", e.target.value)
    setGuessPuzzle(e.target.value);
    if (e.target.value==="") {
      setGuessPuzzleError("You have to guess something...")
    } else if (e.target.value.length>75) {
      setGuessPuzzleError("Please, give a reasonable guess.")
    } else {
      setGuessPuzzleError("")
    }
  };

  const AttemptToSolvePuzzle = () => {
    if (guessPuzzle===props.puzzlePhrase) {
      props.setWinner(currentPlayer);
      navigate("/results");
    } else {
      setGuessPuzzle("");
      setAttemptToSolve(false);
      setStatusMessage(`Sorry ${currentPlayer.name}, that is not the correct answer.`);
      changeTurn();
    };
  };

  const guessDisabled= latestGuessError;
  //** 
  const guessPuzzleDisabled = guessPuzzleError;

  // console.log("GAMEPAGE.JS' RANDOM WHEELSEGMENT: ", WheelSegments[Math.floor(Math.random()*WheelSegments.length)]);
  // console.log("GAMEPAGE.JS WHEELSEGMENTS' RANDOM NUMBER: ", Math.floor(Math.random()*WheelSegments.length));
  // console.log("GAMEPAGE.JS' GUESSEDLETTERS: ", guessedLetters);
  // console.log("GAMEPAGE.JS' PLAYERS2: ", players2);
  // console.log("GAMEPAGE.JS' TURNCOUNT: ", turnCount);
  // console.log("GAMEPAGE.JS' PROPS.SETTINGSDATA: ", props.settingsData);
  // console.log("GAMEPAGE.JS' PLAYERNAMES: ", playerNames);
  // console.log("ALLLETTERS: ", allLetters);
  // console.log("GAMEPAGE.JS' PROPS: ", props);
  // console.log("GAMEPAGE.JS' PLAYERS: ", players);
  // console.log("GAMEPAGE.JS' PUZZLELETTERS: ", puzzleLetters);
  // console.log("GAMEPAGE.JS' NOMOREVOWELS: ", noMoreVowels);
  // console.log("GAMEPAGE.JS' PROPS.WINNER: ", props.winner);
  // console.log("CONSONANTMULTIPLIER: ", consonantMultiplier);

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
        <div className="readout">
          <p className="game-status">Game Status: {statusMessage}</p>
          <div className={!props.winner?"interface": "hidden"}>
            <button className={wheelValue || vowelInterface || noMoreConsonants || isSpinning || attemptToSolve?"hidden":null} onClick={spinIt} >Spin It!</button>
            <br/>
            <button className={wheelValue || currentPlayer.score<250 || vowelInterface || noMoreVowels || isSpinning || attemptToSolve?"hidden":null} onClick={buyVowel} >Buy a Vowel!</button>
            <br/>
            <button className={wheelValue || vowelInterface || isSpinning || attemptToSolve?"hidden":null} onClick={solveIt} >Attempt to Solve!</button>
            <br/>
            <p>Value: {wheelValue}</p>
            <p>Prize: {wheelPrize}</p>
            {/* <button onClick={changeTurn} >Change Turn!</button> */}
            <br/>
            {/* <button onClick={changeScore} >Add to Score!</button> */}
            {/* <button onClick={changePrizes} >Add to Prizes!</button> */}
            <br/>
              <label className={!wheelValue?"hidden":null} htmlFor="guess-consonant">Guess a Consonant</label>
              <input
              className={!wheelValue?"hidden":null}
              type="text"
              name="guess-consonant"
              id="guess-consonant"
              placeholder="Guess a Consonant"
              value={latestConsonant}
              onChange={handleConsonantGuess}/>
            
            <br/>
            <label className={!vowelInterface?"hidden":null} htmlFor="guess-vowel">Guess a Vowel</label>
            <input
            className={!vowelInterface?"hidden":null}
            type="text"
            name="guess-vowel"
            id="guess-vowel"
            placeholder="Guess a Vowel"
            value={latestVowel}
            onChange={handleVowelGuess}/>
            <br/>
            <button className={vowelInterface || wheelValue?null:"hidden"}disabled={guessDisabled} onClick={guessLetter} >Guess a Letter!</button>
            
            {latestGuessError?<p className="error-message">{latestGuessError}</p>:null}
            
            <br/>
            <label className={!attemptToSolve?"hidden":null} htmlFor="guess-puzzle">Guess the Puzzle</label>
            <input
            className={!attemptToSolve?"hidden":null}
            type="text"
            name="guess-puzzle"
            id="guess-puzzle"
            placeholder="Guess the Puzzle!"
            value={guessPuzzle}
            onChange={handlePuzzleGuess}/>
            <br/>
            <button className={!attemptToSolve?"hidden":null} disabled={guessPuzzleDisabled} onClick={AttemptToSolvePuzzle} >Guess the Puzzle!</button>
            
            {guessPuzzleError?<p className="error-message">{guessPuzzleError}</p>:null}
            <br/>
            {/* <p>Current Player: {currentPlayer}</p> */}
            <p>Guessed Letters: {guessedLetters} </p>
          </div>
        </div>
        
        <Players
          players={players}
          currentPlayer={currentPlayer.name}
          />
    </>
  )
}
