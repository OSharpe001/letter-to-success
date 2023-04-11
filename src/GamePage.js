import Board from "./components/Board"
import Wheel from "./components/Wheel"
import Pointer from "./components/Pointer"
import Players from "./components/Players"

export default function GamePage(props) {

  const playerNames=[props.settingsData.player1_name, props.settingsData.player2_name, props.settingsData.player3_name]
  // console.log("GAMEPAGE.JS' PROPS: ", props.settingsData);
  // console.log("GAMEPAGE.JS' PLAYERNAMES: ", playerNames)

  return (
    <>
        <h1>GamePage...</h1>
        <div className="game-page">
          <Board />
          <Wheel />
          <Pointer />
        </div>
        <Players
          playerNames={playerNames}
          computer_player_amount={props.settingsData.computer_player_amount}
          />
    </>
  )
}
