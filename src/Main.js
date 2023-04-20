import HomePage from "./HomePage"
import Settings from "./Settings"
import GamePage from "./GamePage"
import Results from "./Results"
import Header from "./components/Header"
import { Puzzles } from './assets/game_data/puzzles'
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";


export default function Main() {

  const [humanPlayerAmount, setHumanPlayerAmount] = useState(1);
  const [computerPlayerAmount, setComputerPlayerAmount] = useState(0);
  const [player1Name, setPlayer1Name] = useState("");
  const [player1NameError, setPlayer1NameError] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [player2NameError, setPlayer2NameError] = useState("");
  const [player3Name, setPlayer3Name] = useState("");
  const [player3NameError, setPlayer3NameError] = useState("");
  const [humanPlayerAmountError, setHumanPlayerAmountError] = useState("");
  const [computerPlayerAmountError, setComputerPlayerAmountError] = useState("");
  const [computerDifficultyLevel, setComputerDifficultyLevel] = useState(1);
  const [computerDifficultyError, setComputerDifficultyError] = useState("");
  const [settingsData, setSettingsData] =useState({})
  const [winner, setWinner] = useState("");

  const navigate = useNavigate();

  const submitSettingsForm = (formData) => {
    // console.log("MAIN.JS SUBMITSETTINGSFORM'S FORMDATA: ", formData)
    setSettingsData(formData);
    navigate("/game_page");
  };

  const puzzleChoice = Puzzles[Math.floor(Math.random()*Puzzles.length)];
  const puzzleType = puzzleChoice.type;
  const puzzlePhrase = puzzleChoice.phrases[Math.floor(Math.random()*puzzleChoice.phrases.length)].toUpperCase()
  // console.log("MAIN.JS' SETTINGS FORM DATA: ", settingsData)
  return (
    <>
      <Header />
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/settings" element={<Settings
                                              humanPlayerAmount={humanPlayerAmount}
                                              humanPlayerAmountError={humanPlayerAmountError}
                                              setHumanPlayerAmountError={setHumanPlayerAmountError}
                                              setHumanPlayerAmount={setHumanPlayerAmount}
                                              computerPlayerAmount={computerPlayerAmount}
                                              setComputerPlayerAmount={setComputerPlayerAmount}
                                              setComputerPlayerAmountError={setComputerPlayerAmountError}
                                              player1Name={player1Name}
                                              setPlayer1Name={setPlayer1Name}
                                              player1NameError={player1NameError}
                                              setPlayer1NameError={setPlayer1NameError}
                                              player2Name={player2Name}
                                              setPlayer2Name={setPlayer2Name}
                                              player2NameError={player2NameError}
                                              setPlayer2NameError={setPlayer2NameError}
                                              player3Name={player3Name}
                                              setPlayer3Name={setPlayer3Name}
                                              player3NameError={player3NameError}
                                              setPlayer3NameError={setPlayer3NameError}
                                              submitForm={submitSettingsForm}
                                              computerPlayerAmountError={computerPlayerAmountError}
                                              computerDifficultyLevel={computerDifficultyLevel}
                                              setComputerDifficultyLevel={setComputerDifficultyLevel}
                                              computerDifficultyError={computerDifficultyError}
                                              setComputerDifficultyError={setComputerDifficultyError}
                                              />}/>
            <Route path="/game_page" element={<GamePage
                                                settingsData={settingsData}
                                                puzzlePhrase={puzzlePhrase}
                                                puzzleType={puzzleType}
                                                computerDifficultyLevel={computerDifficultyLevel}
                                                winner={winner}
                                                setWinner={setWinner}
                                                />}/>
            <Route path="/results" element={<Results
                                              winner={winner}
                                              setWinner={setWinner}
                                              />}/>
        </Routes>
    </>
  );
};
