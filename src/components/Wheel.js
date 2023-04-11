import {WheelSegments} from '../assets/wheelSegments'

export default function Wheel() {
  return (
    <>
      <ul className="wheel">
          {WheelSegments.map(item =>
              <li  key={item.text} className="wheel-segment">
                <div className="segment-content">
                  <div className="value">{item.text}</div>
                  <br/>
                  <div className="prize">{/*item.prize*/}</div>
                </div>
              </li>
          )}
        </ul>
    </>
  )
}
