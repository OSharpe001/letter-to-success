// THE WHITE AT THE BOTTOM OF THE PAGE SIGNIFIES THE END OF MY STANDARD SCREEN HEIGHT

// TODO#14-PUSH THE "PLAYERNAMES"/"PLAYERS" CONFIGURATION UP TO SETTINGS.JS TO KEEP STABILITY IF THE REFRESH BUTTON IS PRESSED ON THE GAMEPAGE
// --DIDN'T WORK!--THIS DIDN'T STOP "PLAYERS/PLAYERNAMES FROM CHANGING WHEN THE PAGE WAS REFRESHED
//                 --ALSO, MY AUTORESET WAS INNEFECTIVE AFTER "PLAYERS/PLAYERNAMES" WAS MOVED TO MAIN.JS (I DON'T THINK USEEFFECT WORKS IF THE DEPENDENCY-LIST IS A PROP)

// TODO:
// 11-SETUP A BETTER PUZZLE DESIGN WITH MORE WORDS ON A SINGLE LINE AND
//    A SET OF GREEN BACKGROUND BRICKS
// 12-SET UP COMPUTER PLAYERS BEHAVIOR (POSSIBLE TO USE A USEEFFECT HOOK FOR THIS!)
// XXXXXXXXXXXXXXXXXXX---COMPUTER LETTER SELECTION LIST (IN ORDER OF MOST POPULAR LETTER)
// XXXXXXXXXXXXXXXXXXX-----COMPUTER CHOICE OF LETTER GUESS BASED ON DIFFICULTY LEVEL
// XXXXXXXXXXXXXXXXXXX---CONDITIONS FOR THE COMPUTER TO BUY A VOWEL(IF CURRENTPLAYER.SCORE>250? COMPUTERLETTERSELECTIONLIST+=VOWELS)
// 13-SET UP WHEEL SO THAT IT STOPS/STARTS ON THE PROPER SEGMENT
// 14-RECONFIGURE HOW "PLAYERS" INFO IS DERIVED

import Board from "./components/Board";
import Wheel from "./components/Wheel";
import Pointer from "./components/Pointer";
import Players from "./components/Players";
import doubleLeftArrow from "./assets/images/doubleLeftArrow.png";
import doubleRightArrow from "./assets/images/doubleRightArrow.png";
import { WheelSegments } from "./assets/game_data/wheelSegments";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function GamePage(props) {

  const computerPlayerAmount=parseInt(props.settingsData.computerPlayerAmount);
  const computerPlayerNames=[];
  for (let i=0; i<computerPlayerAmount; i++) {
      computerPlayerNames.push("Computer "+(i+1))
  };
  const playerNames=[props.settingsData.player1Name, props.settingsData.player2Name, props.settingsData.player3Name, ...computerPlayerNames].filter(pName => pName!=="")

  const [wheelInfo, setWheelInfo] = useState(["", 0, false])
  const [latestConsonant, setLatestConsonant] = useState("");
  const [latestVowel, setLatestVowel] = useState("");
  const [latestGuessError, setLatestGuessError] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [showGuessedLetters, setShowGuessedLetters] = useState(true);
  const [isSpinning, setIsSpinning] = useState(false);
  const [turnCount, setTurnCount] = useState(0);
  const [statusMessage, setStatusMessage] = useState('PLAYERS, ARE YOU READY TO "CLIMB THE LETTER"?!?');
  const [vowelInterface, setVowelInterface] = useState(false);
  const [noMoreVowels, setNoMoreVowels] = useState(false);
  const [noMoreConsonants, setNoMoreConsonants] = useState(false);
  const [attemptToSolve, setAttemptToSolve] = useState(false);
  const [guessPuzzle, setGuessPuzzle] = useState("");
  const [guessPuzzleError, setGuessPuzzleError] = useState("");
  const [pauseControls, setPauseControls] = useState(false);
  const [latestLetter, setLatestLetter] = useState("");
  // const [currentComputerChoice, setCurrentComputerChoice] = useState("")
  const [players, setPlayers]= useState(playerNames.map(player => (
    {
      "name":player,
      "score":0,
      "prizes":[]
    }
  )));

  const consonantInput=useRef();
  const vowelInput=useRef();
  const solveInput=useRef();

  const navigate = useNavigate();
  const autoReset = useEffect;
  const autoFocus = useEffect;
  const winner = useEffect;
  const computerPlayersBehavior = useEffect;

  const consonants = ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"];
  const vowels = ["A", "E", "I", "O", "U"];
  const allLetters = ["Z", "Q", "X", "J", "K", "V", "B", "P", "Y", "G", "F", "W", "M", "U", "C", "L", "D", "R", "H", "S", "N", "I", "O", "A", "T", "E"]
  // const allLetters = [...consonants, ...vowels];
  const puzzleLetters = props.puzzlePhrase.split("").filter(letter=>allLetters.indexOf(letter)>-1);
  const consonantMultiplier = (puzzleLetters.filter(letter=>letter===latestConsonant)).length;
  const vowelMultiplier= (puzzleLetters.filter(letter=>letter===latestVowel)).length;
  const wheelValue = wheelInfo[1];
  const wheelPrize = wheelInfo[2];
  const vowelCost= 250;

  const currentPlayerNumber = [(turnCount)%(playerNames.length)];
  const currentPlayer = players[currentPlayerNumber];
  const nextPlayer = players[(turnCount+1)%(playerNames.length)];

  const guessDisabled= latestGuessError;
  const guessPuzzleDisabled = guessPuzzleError;


  autoReset(()=> {
    // console.log('THE USEEFFECT HOOK "AUTORESET" WAS JUST TRIGGERRED');
    if (!players[1].name) {
      setPlayers([])
      navigate("/settings")
    }
  },players);

  autoFocus(()=> {
    if (vowelInterface) {
      vowelInput.current.focus();
    }
    if (wheelValue) {
      consonantInput.current.focus();
    }
    if (attemptToSolve) {
      solveInput.current.focus();
    }
  }, [vowelInterface, wheelValue, attemptToSolve]);

  computerPlayersBehavior(() => {
    if (currentPlayer.name.indexOf("Computer")!==0) {
      return
    } else {
      console.log("COMPUTERPLAYERBEHAVIOR STARTING...")
      console.log("GAMEPAGE.JS COMPUTERPLAYERBEHAVIOR CURRENTPLAYER: ", currentPlayer);
      const smartPlay= Math.floor(Math.random() * 10)>props.settingsData.computerDifficultyLevel?"off":"on";
      console.log("SMARTPLAY IS ", smartPlay);

      let computerSelection;
      let computerChoice;
      const getComputerSelection = () => {
        if (currentPlayer.score<vowelCost) {
          computerSelection = [...allLetters].filter(letter => guessedLetters.indexOf(letter)<0).filter(letter => vowels.indexOf(letter)<0);
        } else {
          computerSelection = [...allLetters].filter(letter => guessedLetters.indexOf(letter)<0);
        };
      };
      getComputerSelection();
      console.log("CURRENT COMPUTERSELECTION", computerSelection);


      const guessOrPass = () => {
        if (computerSelection.length===0) {
          console.log("COMPUTERSELECTION.LENGTH IS ZERO. COMPUTER PASSES THEIR TURN...")
          setStatusMessage(`${currentPlayer.name} passes their turn...`);
          changeTurn();
        };
      };
      guessOrPass();

      const getComputerChoice = () => {
        if (smartPlay==="on") {
          computerChoice = computerSelection.slice(-1).toString();
        } else {
          const randomGuess=Math.floor(Math.random() * computerSelection.length)
          computerChoice = computerSelection.slice(randomGuess,randomGuess+1).toString();
        };
      };
      getComputerChoice();
      console.log("CURRENT COMPUTERCHOICE IS ", computerChoice);

      if (vowels.indexOf(computerChoice)>=0) {
        let newList=[...players];
        newList[currentPlayerNumber].score-=vowelCost;
        setPlayers(newList);
        setLatestLetter(computerChoice);
        setTimeout(setGuessedLetters, 1500, () => {
          const newGuessedLetters = [...guessedLetters];
          newGuessedLetters.push(computerChoice);
          newGuessedLetters.sort();
          if (vowels.every(vowel => newGuessedLetters.indexOf(vowel) >= 0)) {
            setNoMoreVowels(true);
            setTimeout(setStatusMessage, 3000, "There are no more vowels...");
          };
          return newGuessedLetters;
        });

        const hitOrMiss = () => {
          if (puzzleLetters.indexOf(computerChoice) >= 0) {
            const vowelMultiplier = (puzzleLetters.filter(letter=>letter===computerChoice)).length;
            (vowelMultiplier>1?setStatusMessage(`There are ${vowelMultiplier} ${computerChoice}'s!`):setStatusMessage(`There is 1 ${computerChoice}.`));
            // THIS IS THE "END OF PROCESS", SO FAR, FOR WHEN THE VOWEL IS GUESSED CORRECTLY BY COMPUTER PLAYER.
                // ******NEED TO CREATE SOMETHING TO MAKE THE PROCESS RECYCLE*******
            return
          } else {
            setStatusMessage(`There are no ${computerChoice}'s. (sorry...)`);
            changeTurn();
          };
        };
        setTimeout(hitOrMiss, 1500);

      } else {
        const newSpin=WheelSegments[Math.floor(Math.random()*WheelSegments.length)];
        setIsSpinning(true);
        setTimeout(stopSpinning, 5000);
        // const newSpin=WheelSegments[Math.floor(Math.random()*WheelSegments.length)];
        setTimeout(setWheelInfo, 5000, [newSpin.type, newSpin.value, newSpin.prize]);
        console.log("GAMEPAGE.JS COMPUTERPLAYERBEHAVIOR NEWSPIN TYPE/VALUE/PRIZE: ", newSpin.type, newSpin.value, newSpin.prize)
        const guessOrLoseTurn= () => {
          if (newSpin.type==="bankrupt") {
            console.log(`${currentPlayer.name} just went 'BANKRUPT'`)
            setStatusMessage(`${currentPlayer.name} just went BANKRUPT! (OUCH!)`);
            let newList=[...players];
            newList[currentPlayerNumber].score=0;
            newList[currentPlayerNumber].prizes=[];
            setPlayers(newList)
            changeTurn();
          } else if (newSpin.type==="loseturn") {
            setStatusMessage(`${currentPlayer.name} just lost their turn! (sorry...)`);
            console.log(`${currentPlayer.name} just hit a 'LOSETURN'`)
            changeTurn();
          } else {
            setTimeout(setLatestLetter, 5100, computerChoice);
            setTimeout(setGuessedLetters, 6500, ()=> {
              const newGuessedLetters=[...guessedLetters];
              newGuessedLetters.push(computerChoice);
              newGuessedLetters.sort();
              if (consonants.every(consonant => newGuessedLetters.indexOf(consonant) >= 0)) {
                setNoMoreConsonants(true);
                setTimeout(setStatusMessage, 5000, "There are no more consonants...");
              };
              return newGuessedLetters;
            });
            const hitOrMiss = () => {
              if (puzzleLetters.indexOf(computerChoice)>=0) {
                let newList=[...players];
                const consonantMultiplier = (puzzleLetters.filter(letter=>letter===computerChoice)).length;
                console.log("GAMEPAGE.JS COMPUTERPLAYERBEHAVIOR HITORMISS' CONSONANTMULTIPLIER: ", consonantMultiplier)
                console.log("GAMEPAGE.JS COMPUTERPLAYERBEHAVIOR HITORMISS' NEWSPIN.VALUE: ", newSpin.value)
                console.log("GAMEPAGE.JS COMPUTERPLAYERBEHAVIOR HITORMISS' NEWSPIN.PRIZE: ", newSpin.prize)
                newList[currentPlayerNumber].score+=(newSpin.value*consonantMultiplier);
                if (newSpin.prize) {
                  newList[currentPlayerNumber].prizes.push(newSpin.prize);
                };
                (consonantMultiplier>1?setStatusMessage(`There are ${consonantMultiplier} ${computerChoice}'s!`):setStatusMessage(`There is 1 ${computerChoice}.`));
                // THIS IS THE "END OF PROCESS", SO FAR, FOR WHEN THE CONSONANT IS GUESSED CORRECTLY BY COMPUTER PLAYER.
                // ******NEED TO CREATE SOMETHING TO MAKE THE PROCESS RECYCLE*******
                // setPlayers(players)
                // return
              } else {
                setStatusMessage(`There are no ${computerChoice}'s. (sorry...)`);
                changeTurn(); // THIS CHANGETURN ALLOWS THE PROCESS TO RECYCLE IF CURRENT COMPUTER PLAYER GUESSES WRONG AND THE NEXT PLAYER IS A COMPUTER...
                // setPauseControls(false);
              };
            };
            setTimeout(hitOrMiss, 2000);
          };
        };
        setTimeout(guessOrLoseTurn, 5005);
      };
    }
    // return
  }, [currentPlayer], players)

  winner(()=> {
    if (puzzleLetters.every(letter=>guessedLetters.indexOf(letter)>=0)) {
      setStatusMessage(`${currentPlayer.name} HAS WON!!!`);
      setTimeout(props.setWinner, 3500, currentPlayer);
      setTimeout(navigate, 3501, "/results");
    } else {
      setPauseControls(false);
      setTimeout(setLatestLetter, 2200, "")
    };
  });

  const stopSpinning = () => {
    setIsSpinning(false);
  };

  const spinIt = () =>{
    setStatusMessage("");
    // if (currentPlayer.name.indexOf("Computer")!==0) {
    //   setStatusMessage("");
    // };
    setIsSpinning(true);
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
    setTimeout(badNews, 5050);
  };

  const buyVowel = () => {
    let newList=[...players];
    newList[currentPlayerNumber].score-=vowelCost;
    setPlayers(newList);
    setVowelInterface(true);
  };

  const solveIt = () => {
    // console.log("GAMEPAGE.JS' SOLVEIT IN PROGRESS");
    // setStatusMessage("");
    solveInput.current.focus();
    setAttemptToSolve(true);
  };

  const changeTurn = (time=1750) => {
    // setStatusMessage("");
    setTurnCount(turnCount+1);
    setTimeout(setStatusMessage, time, `It's your turn, ${nextPlayer.name}.`);
    setWheelInfo(["", 0, false]);
  };

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

  const handleConsonantGuess = (e) => {
    // console.log("GAMEPAGE.JS HANDLECONSONANTGUESS' E BEFORE TOUPPERCASE FUNCTION: ", e)
    e=e.toUpperCase();
    // console.log("GAMEPAGE.JS HANDLECONSONANTGUESS' E: ", e)
    setLatestConsonant(e)
    if (consonants.indexOf(e)<0) {
      setLatestGuessError("Choose a consonant.")
    } else if (e==="" || e.length>1 || guessedLetters.indexOf(e)>-1) {
      setLatestGuessError("Choose a new single consonant.");
    } else if (vowels.indexOf(e)>-1) {
      setLatestGuessError("Please choose a consonent.")
    }else {
      setLatestGuessError("");
    };
  };

  const handleVowelGuess = (e) => {
    e=e.toUpperCase();
    // console.log("GAMEPAGE.JS HANDLEVOWELGUESS' E: ", e)
    setLatestVowel(e);
    if (vowels.indexOf(e)<0) {
      setLatestGuessError("Choose a vowel.");
    } else if (e==="" || e.length>1 || guessedLetters.indexOf(e)>-1) {
      setLatestGuessError("Choose a new single Vowel.");
    } else if (consonants.indexOf(e)>-1) {
      setLatestGuessError("Please choose a Vowel.");
    }else {
      setLatestGuessError("");
    };
  };

  const guessLetter = (e) => {
    e.preventDefault();
    if (guessedLetters.indexOf(latestConsonant)<0 && latestConsonant!=="") {
      setLatestLetter(latestConsonant);
      setTimeout(setGuessedLetters(()=> {
        const newGuessedLetters=[...guessedLetters];
        newGuessedLetters.push(latestConsonant);
        newGuessedLetters.sort();
        if (consonants.every(consonant=>newGuessedLetters.indexOf(consonant)>=0)) {
          setNoMoreConsonants(true);
          setTimeout(setStatusMessage, 3000, "There are no more consonants...");
        };
        return newGuessedLetters;
      }), 1500)
      if (puzzleLetters.indexOf(latestConsonant)>=0) {
        changeScore();
        (consonantMultiplier>1?setStatusMessage(`There are ${consonantMultiplier} ${latestConsonant}'s!`):setStatusMessage(`There is 1 ${latestConsonant}.`));
      } else {
        setStatusMessage(`There are no ${latestConsonant}'s. (sorry...)`);
        changeTurn();
      };
      setPauseControls(true);
      setLatestConsonant("");
    } else if (guessedLetters.indexOf(latestVowel)<0 && latestVowel!=="") {
      setLatestLetter(latestVowel);
      setTimeout(setGuessedLetters(()=>{
        const newGuessedLetters=[...guessedLetters];
        newGuessedLetters.push(latestVowel);
        newGuessedLetters.sort();
        if (vowels.every(vowel=>newGuessedLetters.indexOf(vowel)>=0)) {
          setNoMoreVowels(true);
          setTimeout(setStatusMessage, 3000, "There are no more vowels...");
        };
        return newGuessedLetters;
      }), 1500);
      if (puzzleLetters.indexOf(latestVowel)<0) {
        setStatusMessage(`There are no ${latestVowel}'s. (sorry...)`);
        changeTurn();
      } else if (vowelMultiplier>1){
        setStatusMessage(`There are ${vowelMultiplier} ${latestVowel}'s!`);
      } else {
        setStatusMessage(`There is 1 ${latestVowel}.`);
      };
      setVowelInterface(false);
      setPauseControls(true);
      setLatestVowel("");
    };
  };

  const handlePuzzleGuess = (e) => {
    e.target.value=e.target.value.toUpperCase();
    // console.log("GAMEPAGE.JS HANDLEPUZZLEGUESS' E.TARGET.VALUE: ", e.target.value)
    setGuessPuzzle(e.target.value);
    if (e.target.value==="") {
      setGuessPuzzleError("You have to guess something...");
    } else if (e.target.value.length>75) {
      setGuessPuzzleError("Please, give a reasonable guess.");
    } else {
      setGuessPuzzleError("");
    };
  };

  const AttemptToSolvePuzzle = (e) => {
    e.preventDefault();
    if (guessPuzzle===props.puzzlePhrase) {
      setStatusMessage(`Congratulations, ${currentPlayer.name}! That was the correct answer!`);
      const filteredGuessPuzzle = [...guessPuzzle].filter(letter => allLetters.indexOf(letter)>=0);
      setTimeout(setGuessedLetters, 1500, [...new Set(filteredGuessPuzzle)]);
    } else if (guessPuzzle.length>0) {
      setGuessPuzzle("");
      setAttemptToSolve(false);
      setStatusMessage(`Sorry ${currentPlayer.name}, that is not the correct answer.`);
      changeTurn();
    };
  };

  const toggleShowGuessedLetters = () => {
    setShowGuessedLetters(!showGuessedLetters);
  };

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
    <div className="game-page">
        <div className="board-set">
          <Board
            puzzlePhrase={props.puzzlePhrase}
            puzzleType={props.puzzleType}
            guessedLetters={guessedLetters}
            latestLetter={latestLetter}
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
          <p className="game-status">{statusMessage}</p>

          <div className={"interface"}>
            <div className="wheel-info">
              <p className={wheelValue?null:"hidden"}>${wheelValue}</p>
              <p className={wheelValue && wheelPrize?null:"hidden"}>and  a {wheelPrize}</p>
            </div>

            <div className="interface-options">
              <button className={wheelValue || vowelInterface || noMoreConsonants || isSpinning || attemptToSolve || pauseControls?"hidden":"button spin"} onClick={spinIt} >Spin It!</button>
              <button className={wheelValue || vowelInterface || isSpinning || attemptToSolve || pauseControls?"hidden":"button solve"} onClick={solveIt} >Attempt to Solve!</button>
              <button className={wheelValue || currentPlayer.score<250 || vowelInterface || noMoreVowels || isSpinning || attemptToSolve || pauseControls?"hidden":"button buy"} onClick={buyVowel} >Buy a Vowel!</button>
            </div>

            <div className="spin-solve-buy">
              <form className={(!wheelValue && !vowelInterface) || currentPlayer.name.indexOf("Computer")>=0?"hidden":!vowelInterface?"left":"right"}>
                <label className={!wheelValue?"hidden":null} htmlFor="guess-consonant">Guess a Consonant</label>
                <input
                ref={consonantInput}
                className={!wheelValue?"hidden":null}
                type="text"
                name="guess-consonant"
                id="guess-consonant"

                placeholder="Consonant"
                value={latestConsonant}
                onChange={e => handleConsonantGuess(e.target.value)}/>
                
                <label className={!vowelInterface?"hidden":null} htmlFor="guess-vowel">Guess a Vowel</label>
                <input
                ref={vowelInput}
                className={!vowelInterface?"hidden":null}
                type="text"
                name="guess-vowel"
                id="guess-vowel"
                placeholder="Vowel"
                value={latestVowel}
                onChange={e => handleVowelGuess(e.target.value)}/>
                <button htmlFor={!vowelInterface?"guess-consonant":"guess-vowel"} className={vowelInterface || wheelValue?"button":"hidden"} disabled={guessDisabled} onClick={guessLetter} >Guess a Letter!</button>
                <p className="error-message">{latestGuessError}</p>
              </form>
            
              <form className={!attemptToSolve?"hidden":"center"}>
                <label htmlFor="guess-puzzle">Guess the Puzzle</label>
                <input
                ref={solveInput}
                className={!attemptToSolve?"hidden":null}
                type="text"
                name="guess-puzzle"
                id="guess-puzzle"
                placeholder="Guess the Puzzle!"
                value={guessPuzzle}
                onChange={handlePuzzleGuess}/>
                <button htmlFor="guess-puzzle" className={!attemptToSolve?"hidden":"button"} disabled={guessPuzzleDisabled} onClick={AttemptToSolvePuzzle} >Guess the Puzzle!</button>
                <p className="error-message">{guessPuzzleError}</p>
              </form>
            </div>

            <div className="guessed-letters-section">
              {showGuessedLetters?
                <button onClick={toggleShowGuessedLetters}><img
                  className="arrow-image"
                  src={doubleLeftArrow}
                  alt="double left arrow"/>
                </button>
                :
                <button onClick={toggleShowGuessedLetters}><img
                  className="arrow-image"
                  src={doubleRightArrow}
                  alt="double right arrow"/>
                </button>
              }
              <p className={showGuessedLetters?null:"hidden"}>Guessed Letters:</p>
              <p className={showGuessedLetters?"guessed-letters":"hidden"}>{guessedLetters}</p>
            </div>
          </div>
        </div>
        
        <Players
          players={players}
          currentPlayer={currentPlayer.name}
          />
    </div>
  );
};