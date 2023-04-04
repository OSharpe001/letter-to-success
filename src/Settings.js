import { useState } from 'react'

export default function Settings(props) {

    const [humanPlayerAmount, setHumanPlayerAmount] = useState(0);
    const [computerPlayerAmount, setComputerPlayerAmount] = useState(0);
    const [humanPlayerAmountError, setHumanPlayerAmountError] = useState("");
    const [computerPlayerAmountError, setComputerPlayerAmountError] = useState("");
    const [player1Name, setPlayer1Name] = useState("");
    const [player1NameError, setPlayer1NameError] = useState("");
    const [player2Name, setPlayer2Name] = useState("");
    const [player2NameError, setPlayer2NameError] = useState("");
    const [player3Name, setPlayer3Name] = useState("");
    const [player3NameError, setPlayer3NameError] = useState("");


    const playerNameError = "Human players need a name."

    const handleHumanPlayerAmountChange = (e) => {
        setHumanPlayerAmount(e.target.value);
        if (e.target.value < 1) {
            setHumanPlayerAmountError("We need at least one Human Player...");
            return;
        } else if (e.target.value >3) {
            setHumanPlayerAmountError("Sorry. There's a max of three players per game");
        } else {
            setHumanPlayerAmountError("");
        };
    };

    const handleComputerPlayerAmountChange = (e) => {
        setComputerPlayerAmount(e.target.value);
        if (humanPlayerAmount<1 || humanPlayerAmount>3) {
            setComputerPlayerAmountError("Please set proper amount of Human Players, first.")
        } else if (e.target.value + humanPlayerAmount<2) {
            setComputerPlayerAmountError("We need at least two players");
            return;
        } else if (e.target.value + humanPlayerAmount>3) {
            setComputerPlayerAmountError("Sorry. There's a max of three players per game");
        } else {
            setComputerPlayerAmountError("");
        };
    };

    const disabled= !!humanPlayerAmountError || !!computerPlayerAmountError;
    const gotRequiredInfo = !!humanPlayerAmount && (humanPlayerAmount+computerPlayerAmount<4) && (humanPlayerAmount+computerPlayerAmount>1)

    const clearForm = () => {
        setHumanPlayerAmount(0);
        setComputerPlayerAmount(0);
        setPlayer1Name("");
        setPlayer2Name("");
        setPlayer3Name("");
    };

    const setSubmissionErrors = () => {
        if (humanPlayerAmount===0){
            setHumanPlayerAmountError("We need at least one Human Player.")
        };
        if (player1Name === "") {
            setPlayer1NameError(playerNameError);
        };
        if (humanPlayerAmount>1 && player2Name === ""){
            setPlayer2NameError(playerNameError);
        };
        if (humanPlayerAmount>2 && player3Name === ""){
            setPlayer3NameError(playerNameError);
        };
        if (humanPlayerAmount<2 && computerPlayerAmount===0){
            setComputerPlayerAmountError("We need at least two players.")
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!gotRequiredInfo) {
            setSubmissionErrors();
            return
        } else {
                props.submitForm({
                    "human-player-amount":humanPlayerAmount,
                    "computer-player-amount":computerPlayerAmount,
                    "player1-name":player1Name,
                    "player2-name":player2Name,
                    "player3-name":player3Name,
                });
                clearForm();
        }
    };

  return (
    <form
    className="form"
    onSubmit={handleSubmit}
    >
        <h1>Initial Settings</h1>
        <label for="number-of-human-players" >How many human players?</label>
        <input
        type="number"
        min="1"
        max="3"
        name="number-of-human-players"
        id="number-of-human-players"
        value={humanPlayerAmount}
        onChange= {e => handleHumanPlayerAmountChange(e)}
        ></input>
        {humanPlayerAmountError?<p className="error-message">{humanPlayerAmountError}</p>:null}

        <label for="player1name" >First player's name?</label>
        <input
        type="text"
        minLength="1"
        max="7"
        name="player1name"
        id="player1name"
        value={player1Name}
        onChange={e=>setPlayer1Name(e)}
        />
        {player1NameError?<p className="error-message">{player1NameError}</p>:null}


        {humanPlayerAmount>1?
        <>
            <label for="player2name" >Second player's name?</label>
            <input
            type="text"
            minLength="1"
            max="7"
            name="player2name"
            id="player2name"
            value={player2Name}
            onChange={e=>setPlayer2Name(e)}
            />
            {player2NameError?<p className="error-message">{player2NameError}</p>:null}
        </>
        : null}

        {humanPlayerAmount>2?
        <>
            <label for="player3name" >Third player's name?</label>
            <input
            type="text"
            minLength="1"
            max="7"
            name="player3name"
            id="player3name"
            value={player3Name}
            onChange={e=>setPlayer3Name(e)}
            />
            {player3NameError?<p className="error-message">{player3NameError}</p>:null}
        </>
        : null}

        {humanPlayerAmount<3?
        <>
            <label for="number-of-computer-players" >How many computer players?</label>
            <input
            type="number"
            min={humanPlayerAmount<3?1:0}
            max={3-humanPlayerAmount}
            name="number-of-computer-players"
            id="number-of-computer-players"
            value={computerPlayerAmount}
            onChange= {e => handleComputerPlayerAmountChange(e)}
            ></input>
            {computerPlayerAmountError?<p className="error-message">{computerPlayerAmountError}</p>:null}
        </>
        : null}

        <input
                style={disabled?{border: "1px solid #999999", backgroundColor: "#cccccc", color: "#666666", cursor: "not-allowed"}:null}
                disabled={disabled}
                className="button"
                type="submit"
                value="Let's Begin!"
                aria-label="On Click"
                />
    </form>
  )
}
