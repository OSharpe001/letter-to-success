import {WheelSegments} from '../assets/game_data/wheelSegments'

export default function Wheel(props) {
  return (
    <>
      <ul className={props.isSpinning?"spinning": "wheel"}>
          {WheelSegments.map(item =>
              <li  key={item.text} className="wheel-segment">
                <div className="segment-content">
                  <div className="value">{item.text}</div>
                  {/* <br/>
                  <div className="prize">{item.prize}</div> */}
                </div>
                <div className="prize">{item.prize}</div>
              </li>
          )}
        </ul>
    </>
  )
}
