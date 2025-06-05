import { Footer } from "../components";
import { useState } from "react";
import vid from "../assets/video/LetterToSuccessHomePage.mp4";

export default function HomePage({ sound }) {

  const [videoIsPlaying, setVideoIsPlaying] = useState(false);

  const playVid = () => {
    setVideoIsPlaying(!videoIsPlaying);
    setTimeout(setVideoIsPlaying, 100, (videoIsPlaying));
  };

  return (
    <div className="homePage" onClick={playVid}>
      <h1>Spin the wheel and climb the Letter to Success!</h1>
      <video className="vid" width="73%" autoPlay muted={videoIsPlaying || !sound}>
        <source src={vid} type="video/mp4" />
      </video>
      <Footer />
    </div>
  );
};
