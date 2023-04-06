import Board from "./components/Board"
import Wheel from "./components/Wheel"
import Players from "./components/Players"

export default function GamePage(props) {

  const playerNames=[props.settingsData.player1_name, props.settingsData.player2_name, props.settingsData.player3_name]
  // console.log("GAMEPAGE.JS' PROPS: ", props.settingsData);
  // console.log("GAMEPAGE.JS' PLAYERNAMES: ", playerNames)

  return (
    <>
        <h1>GamePage...</h1>
        <Board />
        <Wheel />
        <Players
          playerNames={playerNames}
          computer_player_amount={props.settingsData.computer_player_amount}
          />
    </>
  )
}
