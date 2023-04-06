import {WheelSegments} from '../assets/wheelSegments'

export default function Wheel() {
  return (
        <ul className="wheel">
          {WheelSegments.map(item =>
              <li  key={item.text} className="wheel-segment">{item.text}</li>
          )}
        </ul>
  )
}
