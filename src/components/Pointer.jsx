export default function Pointer({ isMoving }) {

  return (
    <p className={isMoving ? "moving" : "pointer"}>v</p>
  );
};
