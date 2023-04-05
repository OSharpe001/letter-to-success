import {WheelSegments} from '../assets/wheelSegments'

export default function Wheel() {
  return (
    <>
        <h1>Wheel...</h1>

        <ul className="wheel">
          {WheelSegments.map(item => 
            <li  key={item.text} className="wheel-segment">{item.text}</li>
          )}
        </ul>
    </>
  )
}
