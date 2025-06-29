import { wheel } from "../assets/images";
import { useEffect, useState } from "react";

export default function Wheel({ isSpinning, wheelInfo }) {

  const [latestWheelNumber, setLatestWheelNumber] = useState("wheel1");

  const wheelNumber = useEffect;
  wheelNumber(() => {
    if (wheelInfo) {
      if (wheelInfo[0] === "cash") {
        switch (wheelInfo[1]) {
          case 600:
            setLatestWheelNumber("wheel1");
            break;
          case 700:
            setLatestWheelNumber("wheel2");
            break;
          case 900:
            setLatestWheelNumber("wheel3");
            break;
          case 650:
            setLatestWheelNumber("wheel4");
            break;
          case 1000000:
            setLatestWheelNumber("wheel5");
            break;
          case 800:
            setLatestWheelNumber("wheel7");
            break;
          case 500:
            setLatestWheelNumber("wheel8");
            break;
          case 750:
            setLatestWheelNumber("wheel9");
            break;
          case 950:
            setLatestWheelNumber("wheel10");
            break;
          case 2500:
            setLatestWheelNumber("wheel11");
            break;
          case 1000:
            setLatestWheelNumber("wheel13");
            break;
          default:
            setLatestWheelNumber("wheel1");
            break;
        }
      } else if (wheelInfo[0] === "bankrupt") {
        setLatestWheelNumber("wheel12");
      } else if (wheelInfo[0] === "loseturn") {
        setLatestWheelNumber("wheel6");
      };
    };
  }, wheelInfo)

  return (
    <img className={isSpinning ? "spinning" : "wheel " + latestWheelNumber} src={wheel} alt="Letter To Success wheel" />
  );
};
