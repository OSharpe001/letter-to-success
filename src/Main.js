// import Header from "./components/Header"
import HomePage from "./HomePage"
import Settings from "./Settings"
import GamePage from "./GamePage"
import Results from "./Results"
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


  const [settingsData, setSettingsData] =useState({})

  const navigate = useNavigate();

  const playerNameError = "Human players need a name."

  const submitSettingsForm = (formData) => {
    setSettingsData(formData);
    navigate("/GamePage");
  }

  const gotRequiredInfo = !!humanPlayerAmount && (humanPlayerAmount+computerPlayerAmount<4) && (humanPlayerAmount+computerPlayerAmount>1)

    const clearForm = () => {
        setHumanPlayerAmount(0);
        setComputerPlayerAmount(0);
        setPlayer1Name("");
        setPlayer2Name("");
        setPlayer3Name("");
    };

  const setSubmissionErrors = () => {
    if (humanPlayerAmount===0){
        setHumanPlayerAmountError("We need at least one Human Player.")
    };
    if (player1Name === "") {
        setPlayer1NameError(playerNameError);
    };
    if (humanPlayerAmount>1 && player2Name === ""){
        setPlayer2NameError(playerNameError);
    };
    if (humanPlayerAmount>2 && player3Name === ""){
        setPlayer3NameError(playerNameError);
    };
    if (humanPlayerAmount<2 && computerPlayerAmount===0){
        setComputerPlayerAmountError("We need at least two players.")
    }
};

  const handleSettingsSubmit = (e) => {
    e.preventDefault();
    if (!gotRequiredInfo) {
        setSubmissionErrors();
        return
    } else {
            submitSettingsForm({
                "human-player-amount":humanPlayerAmount,
                "computer-player-amount":computerPlayerAmount,
                "player1-name":player1Name,
                "player2-name":player2Name,
                "player3-name":player3Name,
            });
            clearForm();
    };
};

  console.log("MAIN.JS' SETTINGS FORM DATA: ", settingsData)
  return (
    <>
        {/* <Header /> */}
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/settings" element={<Settings
                                              // submitForm={submitSettingsForm}
                                              humanPlayerAmount={humanPlayerAmount}
                                              humanPlayerAmountError={humanPlayerAmountError}
                                              setHumanPlayerAmountError={setHumanPlayerAmountError}
                                              setHumanPlayerAmount={setHumanPlayerAmount}
                                              computerPlayerAmount={computerPlayerAmount}
                                              setComputerPlayerAmount={setComputerPlayerAmount}
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
                                              handleSubmit={handleSettingsSubmit}
                                              computerPlayerAmountError={computerPlayerAmountError}
                                              computerDifficultyLevel={computerDifficultyLevel}
                                              setComputerDifficultyLevel={setComputerDifficultyLevel}
                                              />}/>
            <Route path="/game-page" element={<GamePage
                                                settingsData={settingsData}/>}/>
            <Route path="/results" element={<Results />}/>
        </Routes>
    </>
  );
};
