/* eslint-disable no-unused-vars */
import { Board, Wheel, Pointer, Players } from "../components";
import { doubleLeftArrow, doubleRightArrow } from "../assets/images";
import { WheelSegments } from "../assets/game_data/wheelSegments";
import { applause, aww, bell, buzzer, cheering_crowd, short_applause } from "../assets/sounds";
import { Puzzles } from '../assets/game_data/puzzles';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function GamePage({ settingsData, setWinner, sound }) {

  const consonantInput = useRef();
  const vowelInput = useRef();
  const solveInput = useRef();

  const navigate = useNavigate();
  const autoFocus = useEffect;
  const winner = useEffect;
  const computerPlayersBehavior = useEffect;

  const [puzzleChoice, setPuzzleChoice] = useState(Puzzles[Math.floor(Math.random() * Puzzles.length)]);
  const [puzzleType, setPuzzleType] = useState(puzzleChoice.type);
  const [puzzlePhrase, setPuzzlePhrase] = useState(puzzleChoice.phrases[Math.floor(Math.random() * puzzleChoice.phrases.length)].toUpperCase());

  const longApplause = new Audio(applause);
  const sadCrowd = new Audio(aww);
  const correctBell = new Audio(bell);
  const cheeringCrowd = new Audio(cheering_crowd);
  const shortApplause = new Audio(short_applause);
  const wrongBuzzer = new Audio(buzzer);
  wrongBuzzer.volume = .6;


  const [wheelInfo, setWheelInfo] = useState(["", 0, false]);
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
  const [players, setPlayers] = useState(settingsData && [...settingsData.humanPlayers, ...settingsData.computerPlayers].map(player => (
    {
      "name": player,
      "score": 0,
      "prizes": []
    }
  )));

  const consonants = ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"];
  const vowels = ["A", "E", "I", "O", "U"];
  const allLetters = ["Z", "Q", "X", "J", "K", "V", "B", "P", "Y", "G", "F", "W", "M", "U", "C", "L", "D", "R", "H", "S", "N", "I", "O", "A", "T", "E"];
  const puzzleLetters = puzzlePhrase.split("").filter(letter => allLetters.indexOf(letter) > -1);
  const consonantMultiplier = (puzzleLetters.filter(letter => letter === latestConsonant)).length;
  const vowelMultiplier = (puzzleLetters.filter(letter => letter === latestVowel)).length;
  const wheelValue = wheelInfo[1];
  const wheelPrize = wheelInfo[2];
  const wheelTiming = {
    1000: 6800,
    "bankrupt": 6350,
    2500: 5900,
    950: 5450,
    750: 5000,
    500: 4550,
    800: 4150,
    "loseturn": 3750,
    1000000: 3300,
    650: 2900,
    900: 2500,
    700: 2050,
    600: 1635
  };
  const vowelCost = 250;

  const currentPlayerNumber = [(turnCount) % (players.length)];
  const currentPlayer = players[currentPlayerNumber];
  const computersTurn = currentPlayer && currentPlayer.name.indexOf("Computer") === 0
  const nextPlayer = players[(turnCount + 1) % (players.length)];

  const guessDisabled = latestGuessError;
  const guessPuzzleDisabled = guessPuzzleError;

  autoFocus(() => {
    if (vowelInterface) {
      vowelInput.current.focus();
    };
    if (attemptToSolve) {
      solveInput.current.focus();
    };
  }, [vowelInterface, wheelValue, attemptToSolve]);

  computerPlayersBehavior(() => {
    if (!players) {
      setTimeout(navigate, 100, ("/settings"));
    };

    if (!computersTurn || (puzzleLetters.every(letter => guessedLetters.indexOf(letter) >= 0)) || !!statusMessage) {
      return
    } else {
      const smartPlay = settingsData && Math.floor(Math.random() * 10) > settingsData.computerDifficultyLevel ? "off" : "on";

      let computerSelection;
      let computerChoice;
      const getComputerSelection = () => {
        if (currentPlayer.score < vowelCost) {
          computerSelection = [...allLetters].filter(letter => guessedLetters.indexOf(letter) < 0).filter(letter => vowels.indexOf(letter) < 0);
        } else {
          computerSelection = [...allLetters].filter(letter => guessedLetters.indexOf(letter) < 0);
        };
      };
      getComputerSelection();

      const guessOrPass = () => {
        if (computerSelection.length === 0) {
          sound && sadCrowd.play();
          changeTurn();
          setStatusMessage(`${currentPlayer.name} passes their turn...`);
          return
        };
      };
      guessOrPass();

      const getComputerChoice = () => {
        if (smartPlay === "on") {
          computerChoice = computerSelection.slice(-1).toString();
        } else {
          const randomGuess = Math.floor(Math.random() * computerSelection.length)
          computerChoice = computerSelection.slice(randomGuess, randomGuess + 1).toString();
        };
      };
      getComputerChoice();

      if (computerChoice && vowels.indexOf(computerChoice) >= 0) {
        let newList = players && [...players];
        newList[currentPlayerNumber].score -= vowelCost;
        setPlayers(newList);
        setLatestLetter(computerChoice);
        setGuessedLetters(() => {
          const newGuessedLetters = guessedLetters && [...guessedLetters];
          newGuessedLetters.push(computerChoice);
          newGuessedLetters.sort();
          if (vowels.every(vowel => newGuessedLetters.indexOf(vowel) >= 0)) {
            setNoMoreVowels(true);
            setTimeout(setStatusMessage, 1000, "There are no more vowels...");
            setTimeout(setStatusMessage, 3000, "");
          };
          return newGuessedLetters;
        });
        setTimeout(setLatestLetter, 1500, "")

        const hitOrMiss = () => {
          if (puzzleLetters.indexOf(computerChoice) >= 0) {
            sound && correctBell.play();
            sound && shortApplause.play();
            const vowelMultiplier = (puzzleLetters.filter(letter => letter === computerChoice)).length;
            (vowelMultiplier > 1 ? setStatusMessage(`There are ${vowelMultiplier} ${computerChoice}'s!`) : setStatusMessage(`There is 1 ${computerChoice}.`));
            setTimeout(setStatusMessage, 3000, "");
            return
          } else {
            sound && wrongBuzzer.play();
            sound && sadCrowd.play();
            changeTurn();
            setStatusMessage(`There are no ${computerChoice}'s. (sorry...)`);
            return
          };
        };
        hitOrMiss();

      } else if (computerChoice && consonants.indexOf(computerChoice) >= 0) {
        const newSpin = WheelSegments[Math.floor(Math.random() * WheelSegments.length)];
        setWheelInfo([newSpin.type, newSpin.value, newSpin.prize]);
        const timer = () => {
          if (!newSpin.value) {
            return wheelTiming[newSpin.type]
          } else {
            return wheelTiming[newSpin.value]
          };
        };
        setIsSpinning(true);
        setTimeout(stopSpinning, timer());
        const guessOrLoseTurn = () => {
          if (newSpin.type === "bankrupt") {
            sound && sadCrowd.play();
            changeTurn();
            setStatusMessage(`${currentPlayer.name} just went BANKRUPT! (OUCH!)`);
            let newList = players && [...players];
            newList[currentPlayerNumber].score = 0;
            newList[currentPlayerNumber].prizes = [];
            setPlayers(newList);
            return
          } else if (newSpin.type === "loseturn") {
            sound && sadCrowd.play();
            changeTurn();
            setStatusMessage(`${currentPlayer.name} just lost their turn! (sorry...)`);
            return
          } else {
            (newSpin.prize && (currentPlayer && currentPlayer.prizes.indexOf(newSpin.prize) < 0 ? setStatusMessage(`$${newSpin.value} and a ${newSpin.prize}`) : setStatusMessage("$" + newSpin.value)));
            setLatestLetter(computerChoice);
            setGuessedLetters(() => {
              const newGuessedLetters = guessedLetters && [...guessedLetters];
              newGuessedLetters.push(computerChoice);
              newGuessedLetters.sort();
              if (consonants.every(consonant => newGuessedLetters.indexOf(consonant) >= 0)) {
                setNoMoreConsonants(true);
                setTimeout(setStatusMessage, 3000, "There are no more consonants...");
                setTimeout(setStatusMessage, 5000, "");
              };
              setTimeout(setLatestLetter, 1500, "")
              return newGuessedLetters;
            });
            const hitOrMiss = () => {
              if (puzzleLetters.indexOf(computerChoice) >= 0) {
                let newList = players && [...players];
                const consonantMultiplier = (puzzleLetters.filter(letter => letter === computerChoice)).length;
                newList[currentPlayerNumber].score += (newSpin.value * consonantMultiplier);
                if (newSpin.prize && currentPlayer.prizes.indexOf(newSpin.prize) < 0) {
                  newList[currentPlayerNumber].prizes.push(newSpin.prize);
                }
                setPlayers(newList);
                (consonantMultiplier > 1 ? setTimeout(setStatusMessage, 1000, `There are ${consonantMultiplier} ${computerChoice}'s!`) : setTimeout(setStatusMessage, 1000, `There is 1 ${computerChoice}.`));
                setTimeout(setStatusMessage, 3000, "");
              } else {
                setTimeout(setStatusMessage, 1000, `There are no ${computerChoice}'s. (sorry...)`);
                setTimeout(changeTurn, 900);
                return
              };
            };
            hitOrMiss();
          };
          setWheelInfo(["", 0, false]);
        };
        setTimeout(guessOrLoseTurn, ((timer()) + 50));
      };
    };
  }, [currentPlayer, guessedLetters.length, statusMessage]);

  winner(() => {
    if (puzzleLetters.every(letter => guessedLetters.indexOf(letter) >= 0)) {
      sound && correctBell.play();
      if (currentPlayer.name.indexOf("Computer") < 0) {
        sound && longApplause.play();
        sound && cheeringCrowd.play();
      } else {
        sound && sadCrowd.play();
      };
      setStatusMessage(`${currentPlayer.name} HAS WON!!!`);
      setTimeout(setWinner, 3500, currentPlayer);
      setTimeout(navigate, 3501, "/results");
    } else {
      setPauseControls(false);
      setTimeout(setLatestLetter, 2200, "")
    };
  });

  const stopSpinning = () => {
    setIsSpinning(false);
  };

  const spinIt = () => {
    const newSpin = WheelSegments[Math.floor(Math.random() * WheelSegments.length)];
    setWheelInfo([newSpin.type, newSpin.value, newSpin.prize]);
    const timer = () => {
      if (!newSpin.value) {
        return wheelTiming[newSpin.type]
      } else {
        return wheelTiming[newSpin.value]
      };
    };
    setStatusMessage("");
    setIsSpinning(true);
    setTimeout(stopSpinning, timer());
    const badNews = () => {
      if (newSpin.type === "bankrupt") {
        sound && sadCrowd.play();
        changeTurn();
        setStatusMessage(`${currentPlayer.name} just went BANKRUPT! (OUCH!)`);
        let newList = players && [...players];
        newList[currentPlayerNumber].score = 0;
        newList[currentPlayerNumber].prizes = [];
        setPlayers(newList);
        return
      } else if (newSpin.type === "loseturn") {
        sound && sadCrowd.play();
        changeTurn();
        setStatusMessage(`${currentPlayer.name} just lost their turn! (sorry...)`);
        return
      } else {
        (newSpin.prize && currentPlayer.prizes.indexOf(newSpin.prize) < 0 ? setStatusMessage(`$${newSpin.value} and a ${newSpin.prize}`) : setStatusMessage("$" + newSpin.value));
        consonantInput.current.focus();
      }
    }
    setTimeout(badNews, ((timer()) + 50));
  };

  const buyVowel = () => {
    let newList = players && [...players];
    newList[currentPlayerNumber].score -= vowelCost;
    setPlayers(newList);
    setVowelInterface(true);
  };

  const solveIt = () => {
    setAttemptToSolve(true);
  };

  const changeTurn = (time = 2000) => {
    setTurnCount(turnCount + 1);
    setTimeout(setStatusMessage, time, `It's your turn, ${nextPlayer.name}.`);
    setTimeout(setStatusMessage, (time * 2), "");
    setWheelInfo(["", 0, false]);
  };

  const changeScore = () => {
    let newList = players && [...players];
    newList[currentPlayerNumber].score += (wheelValue * consonantMultiplier);
    if (wheelPrize && currentPlayer.prizes.indexOf(wheelPrize) < 0) {
      newList[currentPlayerNumber].prizes.push(wheelPrize)
    };
    setWheelInfo(["", 0, false]);
    setPlayers(newList)
  };

  const handleConsonantGuess = (e) => {
    e = e.toUpperCase();
    setLatestConsonant(e)
    if (consonants.indexOf(e) < 0) {
      setLatestGuessError("Choose a consonant.")
    } else if (e === "" || e.length > 1 || guessedLetters.indexOf(e) > -1) {
      setLatestGuessError("Choose a new single consonant.");
    } else if (vowels.indexOf(e) > -1) {
      setLatestGuessError("Please choose a consonent.")
    } else {
      setLatestGuessError("");
    };
  };

  const handleVowelGuess = (e) => {
    e = e.toUpperCase();
    setLatestVowel(e);
    if (vowels.indexOf(e) < 0) {
      setLatestGuessError("Choose a vowel.");
    } else if (e === "" || e.length > 1 || guessedLetters.indexOf(e) > -1) {
      setLatestGuessError("Choose a new single Vowel.");
    } else if (consonants.indexOf(e) > -1) {
      setLatestGuessError("Please choose a Vowel.");
    } else {
      setLatestGuessError("");
    };
  };

  const guessLetter = (e) => {
    e.preventDefault();
    if (guessedLetters.indexOf(latestConsonant) < 0 && latestConsonant !== "") {
      setLatestLetter(latestConsonant);
      setTimeout(setGuessedLetters(() => {
        const newGuessedLetters = guessedLetters && [...guessedLetters];
        newGuessedLetters.push(latestConsonant);
        newGuessedLetters.sort();
        if (consonants.every(consonant => newGuessedLetters.indexOf(consonant) >= 0)) {
          setNoMoreConsonants(true);
          setTimeout(setStatusMessage, 1000, "There are no more consonants...");
          setTimeout(setStatusMessage, 3000, "");
        };
        return newGuessedLetters;
      }), 1500)
      if (puzzleLetters.indexOf(latestConsonant) >= 0) {
        sound && correctBell.play();
        sound && shortApplause.play();
        changeScore();
        (consonantMultiplier > 1 ? setStatusMessage(`There are ${consonantMultiplier} ${latestConsonant}'s!`) : setStatusMessage(`There is 1 ${latestConsonant}.`));
        setTimeout(setStatusMessage, 3000, "");
      } else {
        sound && wrongBuzzer.play();
        sound && sadCrowd.play();
        changeTurn();
        setStatusMessage(`There are no ${latestConsonant}'s. (sorry...)`);
      };
      setPauseControls(true);
      setLatestConsonant("");
    } else if (guessedLetters.indexOf(latestVowel) < 0 && latestVowel !== "") {
      setLatestLetter(latestVowel);
      setTimeout(setGuessedLetters(() => {
        const newGuessedLetters = guessedLetters && [...guessedLetters];
        newGuessedLetters.push(latestVowel);
        newGuessedLetters.sort();
        if (vowels.every(vowel => newGuessedLetters.indexOf(vowel) >= 0)) {
          setNoMoreVowels(true);
          setTimeout(setStatusMessage, 1000, "There are no more vowels...");
          setTimeout(setStatusMessage, 3000, "");
        };
        return newGuessedLetters;
      }), 1500);
      if (puzzleLetters.indexOf(latestVowel) < 0) {
        sound && wrongBuzzer.play();
        sound && sadCrowd.play();
        changeTurn();
        setStatusMessage(`There are no ${latestVowel}'s. (sorry...)`);
      } else if (vowelMultiplier > 1) {
        sound && correctBell.play();
        sound && shortApplause.play();
        setStatusMessage(`There are ${vowelMultiplier} ${latestVowel}'s!`);
        setTimeout(setStatusMessage, 2000, "");
      } else {
        sound && correctBell.play();
        sound && shortApplause.play();
        setStatusMessage(`There is 1 ${latestVowel}.`);
        setTimeout(setStatusMessage, 2000, "");
      };
      setVowelInterface(false);
      setPauseControls(true);
      setLatestVowel("");
    };
  };

  const handlePuzzleGuess = (e) => {
    e.target.value = e.target.value.toUpperCase();
    setGuessPuzzle(e.target.value);
    if (e.target.value === "") {
      setGuessPuzzleError("You have to guess something...");
    } else if (e.target.value.length > 75) {
      setGuessPuzzleError("Please, give a reasonable guess.");
    } else {
      setGuessPuzzleError("");
    };
  };

  const AttemptToSolvePuzzle = (e) => {
    e.preventDefault();
    if (guessPuzzle === puzzlePhrase) {
      sound && correctBell.play();
      sound && longApplause.play();
      sound && cheeringCrowd.play();
      setStatusMessage(`Congratulations, ${currentPlayer.name}! That was the correct answer!`);
      const filteredGuessPuzzle = [...guessPuzzle].filter(letter => allLetters.indexOf(letter) >= 0);
      setTimeout(setGuessedLetters, 1500, [...new Set(filteredGuessPuzzle)]);
    } else if (guessPuzzle.length > 0) {
      sound && wrongBuzzer.play();
      sound && sadCrowd.play();
      changeTurn();
      setGuessPuzzle("");
      setAttemptToSolve(false);
      setStatusMessage(`Sorry ${currentPlayer.name}, that is not the correct answer.`);
      setTimeout(setStatusMessage, 3000, "");
    };
  };

  const toggleShowGuessedLetters = () => {
    setShowGuessedLetters(!showGuessedLetters);
  };

  return (
    <div className="game-page">
      <div className="board-set">
        <Board
          puzzlePhrase={puzzlePhrase}
          puzzleType={puzzleType}
          guessedLetters={guessedLetters}
          latestLetter={latestLetter}
          allLetters={allLetters}
        />
        <div className="wheel-set">
          <Wheel
            isSpinning={isSpinning}
            wheelInfo={wheelInfo}
          />
          <Pointer
            isMoving={isSpinning}
          />
        </div>
      </div>
      <div className="readout">
        <p className="game-status">{statusMessage}</p>

        <div className={"interface"}>

          <div className="interface-options">
            <button className={(guessedLetters.length > 0 && statusMessage) || wheelValue || vowelInterface || noMoreConsonants || isSpinning || attemptToSolve || pauseControls || computersTurn ? "hidden" : "button spin"} onClick={spinIt} >Spin It!</button>
            <button className={(guessedLetters.length > 0 && statusMessage) || wheelValue || vowelInterface || isSpinning || attemptToSolve || pauseControls || computersTurn ? "hidden" : "button solve"} onClick={solveIt} >Attempt to Solve!</button>
            <button className={(guessedLetters.length > 0 && statusMessage) || wheelValue || (currentPlayer && currentPlayer.score < 250) || vowelInterface || noMoreVowels || isSpinning || attemptToSolve || pauseControls || computersTurn ? "hidden" : "button buy"} onClick={buyVowel} >Buy a Vowel!</button>
          </div>

          <div className="spin-solve-buy">
            <form className={((!wheelValue || isSpinning) && !vowelInterface) || currentPlayer.name.indexOf("Computer") >= 0 ? "hidden" : !vowelInterface ? "left" : "right"}>
              <label className={!wheelValue || isSpinning ? "hidden" : null} htmlFor="guess-consonant">Guess a Consonant</label>
              <input
                ref={consonantInput}
                className={!wheelValue ? "hidden" : null}
                type="text"
                name="guess-consonant"
                id="guess-consonant"

                placeholder="Consonant"
                value={latestConsonant}
                onChange={e => handleConsonantGuess(e.target.value)} />

              <label className={!vowelInterface ? "hidden" : null} htmlFor="guess-vowel">Guess a Vowel</label>
              <input
                ref={vowelInput}
                className={!vowelInterface ? "hidden" : null}
                type="text"
                name="guess-vowel"
                id="guess-vowel"
                placeholder="Vowel"
                value={latestVowel}
                onChange={e => handleVowelGuess(e.target.value)} />
              <button htmlFor={!vowelInterface ? "guess-consonant" : "guess-vowel"} className={vowelInterface || wheelValue ? "button" : "hidden"} disabled={guessDisabled} onClick={guessLetter} >Guess a Letter!</button>
              <p className="error-message">{latestGuessError}</p>
            </form>

            <form className={!attemptToSolve ? "hidden" : "center"}>
              <label htmlFor="guess-puzzle">Guess the Puzzle</label>
              <input
                ref={solveInput}
                className={!attemptToSolve ? "hidden" : null}
                type="text"
                name="guess-puzzle"
                id="guess-puzzle"
                placeholder="Guess the Puzzle!"
                value={guessPuzzle}
                onChange={handlePuzzleGuess} />
              <button htmlFor="guess-puzzle" className={!attemptToSolve ? "hidden" : "button"} disabled={guessPuzzleDisabled} onClick={AttemptToSolvePuzzle} >Guess the Puzzle!</button>
              <p className="error-message">{guessPuzzleError}</p>
            </form>
          </div>

          <div className="guessed-letters-section">
            {showGuessedLetters ?
              <button onClick={toggleShowGuessedLetters}><img
                className="arrow-image"
                src={doubleLeftArrow}
                alt="double left arrow" />
              </button>
              :
              <button onClick={toggleShowGuessedLetters}><img
                className="arrow-image"
                src={doubleRightArrow}
                alt="double right arrow" />
              </button>
            }
            <p className={showGuessedLetters ? "guessed-letters-label" : "hidden"}>Guessed Letters:</p>
            <div className={showGuessedLetters ? "guessed-letters" : "hidden"}>{guessedLetters.map(char => <p className="guessedChar">{char}</p>)}</div>
          </div>
        </div>
      </div>

      <Players
        players={players}
        currentPlayer={currentPlayer && currentPlayer.name}
      />
    </div>
  );
};
