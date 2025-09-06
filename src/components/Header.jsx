import { Link } from "react-router-dom";

import { whiteMuteSpeaker, whiteSpeaker } from "../assets/images";


export default function Header({ sound, toggleSound }) {

  return (
    <header>
      <nav>
        <Link aria-label="On Click" to="/"><p className="title">Letter To Success!</p></Link>
      </nav>
      <button onClick={toggleSound} className="soundButton">
        {sound ?
          <img
            src={whiteSpeaker}
            alt="white speaker icon"
            className="speaker"
          />
          :
          <img
            src={whiteMuteSpeaker}
            alt="white muted speaker icon"
            className="speaker"
          />
        }
      </button>
      <nav>
        <Link aria-label="On Click" to="/settings" className="button">Set Up!</Link>
      </nav>
    </header>
  );
};
