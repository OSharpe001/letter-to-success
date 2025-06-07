import { HomePage, Settings, GamePage, Results } from "./pages";
import { Header } from "./components";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import './App.css';

function App() {

  const [settingsData, setSettingsData] = useState("");
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
    <div className="App">
      <Header
            sound={sound}
            toggleSound={toggleSound}
          />
      <Routes>
        <Route path="/" element={<HomePage
                                        sound={sound}
                                      />} />
        <Route path="/settings" element={<Settings
                                                submitForm={submitSettingsForm}
                                                sound={sound}
                                              />} />
        <Route path="/game_page" element={<GamePage
                                                settingsData={settingsData}
                                                setWinner={setWinner}
                                                sound={sound}
                                              />} />
        <Route path="/results" element={<Results
                                              winner={winner}
                                              setWinner={setWinner}
                                              sound={sound}
                                            />} />
      </Routes>
    </div>
  );
}

export default App;
