// TODO:
//
// 1-CHANGE ITEM.TEXT AND ITEM.PRIZE TO P-TAGS (AND ADJUST THE CSS ACCORDINGLY)

import {WheelSegments} from '../assets/game_data/wheelSegments'
import { useEffect, useState } from "react";

export default function Wheel(props) {

  const [latestWheelNumber, setLatestWheelNumber] = useState("wheeel1");

  const wheelNumber= useEffect;
  wheelNumber(()=> {
    if (props.wheelInfo) {
      if (props.wheelInfo[0]==="cash") {
        switch(props.wheelInfo[1]) {
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
      } else if (props.wheelInfo[0]==="bankrupt") {
        setLatestWheelNumber("wheel12");
      } else if (props.wheelInfo[0]==="loseturn") {
        setLatestWheelNumber("wheel6");
      };
    };
  }, props.wheelInfo)

  // console.log("WHEEL.JS' PROPS: ", props)
  // console.log("WHEEL.JS' PROPS.WHEELINFO: ", props.wheelInfo)

  return (
    <ul className={props.isSpinning?"spinning": "wheel "+latestWheelNumber}>
      {WheelSegments.map(item =>
        <li  key={item.text} className="wheel-segment">
          <div className="segment-content">
            <div className="value">{item.text}</div>
          </div>
          <div className="prize">{item.prize}</div>
        </li>
      )}
    </ul>
  );
};
