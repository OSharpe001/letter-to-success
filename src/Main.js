import Header from "./components/Header"
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
  const [player2Name, setPlayer2Name] = useState("");
  const [player3Name, setPlayer3Name] = useState("");

  const [settingsData, setSettingsData] =useState({})

  const navigate = useNavigate();

  const submitSettingsForm = (formData) => {
    setSettingsData(formData);
    navigate("/GamePage");
  }

  console.log("MAIN.JS' SETTINGS FORM DATA: ", settingsData)
  return (
    <>
        <Header />
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/settings" element={<Settings
                                              submitForm={submitSettingsForm}
                                              humanPlayerAmount={humanPlayerAmount}
                                              setHumanPlayerAmount={setHumanPlayerAmount}
                                              computerPlayerAmount={computerPlayerAmount}
                                              setComputerPlayerAmount={setComputerPlayerAmount}
                                              player1Name={player1Name}
                                              setPlayer1Name={setPlayer1Name}
                                              player2Name={player2Name}
                                              setPlayer2Name={setPlayer2Name}
                                              player3Name={player3Name}
                                              setPlayer3Name={setPlayer3Name}
                                              />}/>
            <Route path="/game-page" element={<GamePage
                                                settingsData={settingsData}/>}/>
            <Route path="/results" element={<Results />}/>
        </Routes>
    </>
  );
};
