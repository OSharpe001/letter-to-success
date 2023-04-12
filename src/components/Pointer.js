// TODO:
//1- MIGHT WANT TO CREATE ANOTHER CLASSNAME THAT CAN BE USED TO MAKE
//    THE POINTER RATTLE AS THE SEGMENTS PASS THAT CAN BE TOGGLED
//    ON AND OFF WITH THE PRESENCE OF A CERTAIN PROP

export default function Pointer(props) {
  return (
    <p className={props.isMoving?"moving":"pointer"}>v</p>
  )
}
