// import Header from "./components/Header"
import HomePage from "./HomePage"
import Settings from "./Settings"
import GamePage from "./GamePage"
import Results from "./Results"
import { Routes, Route } from "react-router-dom";


export default function Main() {
  return (
    <>
        <h1>The Main Page...</h1>
        {/* <Header /> */}
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/settings" element={<Settings />}/>
            <Route path="/game-page" element={<GamePage />}/>
            <Route path="/results" element={<Results />}/>
        </Routes>
    </>
  );
};
