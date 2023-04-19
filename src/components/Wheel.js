// TODO:
//
// 1-CHANGE ITEM.TEXT AND ITEM.PRIZE TO P-TAGS (AND ADJUST THE CSS ACCORDINGLY)

import {WheelSegments} from '../assets/game_data/wheelSegments'

export default function Wheel(props) {

  return (
    <ul className={props.isSpinning?"spinning": "wheel"}>
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
