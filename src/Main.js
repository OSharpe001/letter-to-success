import { HomePage, Settings, GamePage, Results } from "./Pages";
import { Header, Footer } from "./components";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";


export default function Main() {

  const [settingsData, setSettingsData] =useState({});
  const [winner, setWinner] = useState("");
  const [sound, setSound] = useState(true);

  const navigate = useNavigate();

  const submitSettingsForm = (formData) => {
    setSettingsData(formData);
    navigate("/game_page");
  };

  const toggleSound = () => {
    setSound(!sound);
  };

  return (
    <>
      <Header
            sound={sound}
            toggleSound={toggleSound}
          />
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/settings" element={<Settings
                                              submitForm={submitSettingsForm}
                                              sound={sound}
                                              />}/>
            <Route path="/game_page" element={<GamePage
                                                settingsData={settingsData}
                                                setWinner={setWinner}
                                                sound={sound}
                                                />}/>
            <Route path="/results" element={<Results
                                              winner={winner}
                                              setWinner={setWinner}
                                              />}/>
        </Routes>
        <Footer />
    </>
  );
};
