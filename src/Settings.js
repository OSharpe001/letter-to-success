// import { useState } from 'react'

export default function Settings(props) {

    // const [humanPlayerAmount, setHumanPlayerAmount] = useState(1);
    // const [computerPlayerAmount, setComputerPlayerAmount] = useState(0);
    // const [humanPlayerAmountError, setHumanPlayerAmountError] = useState("");
    // const [computerPlayerAmountError, setComputerPlayerAmountError] = useState("");
    // const [player1Name, setPlayer1Name] = useState("");
    // const [player1NameError, setPlayer1NameError] = useState("");
    // const [player2Name, setPlayer2Name] = useState("");
    // const [player2NameError, setPlayer2NameError] = useState("");
    // const [player3Name, setPlayer3Name] = useState("");
    // const [player3NameError, setPlayer3NameError] = useState("");
    // const [computerDifficultyLevel, setComputerDifficultyLevel] = useState(1);


    const playerNameError = "Human players need a name."

    const handleHumanPlayerAmountChange = (e) => {
        props.setHumanPlayerAmount(e.target.value);
        if (e.target.value < 1) {
            props.setHumanPlayerAmountError("We need at least one Human Player...");
            return;
        } else if (e.target.value >3) {
            props.setHumanPlayerAmountError("Sorry. There's a max of three players per game");
        } else {
            props.setHumanPlayerAmountError("");
        };
    };

    const handleComputerPlayerAmountChange = (e) => {
        props.setComputerPlayerAmount(e.target.value);
        // console.log("COMPUTER PLAYER AMOUNT: ", parseInt(e.target.value))
        // console.log("ADDITION OF TOTAL PLAYER AMOUNT: ", parseInt(humanPlayerAmount)+parseInt(e.target.value))
        if (parseInt(props.humanPlayerAmount)<1 || parseInt(props.humanPlayerAmount)>3) {
            props.setComputerPlayerAmountError("Please set proper amount of Human Players, first.")
        } else if (parseInt(e.target.value) + parseInt(props.humanPlayerAmount)<2) {
            props.setComputerPlayerAmountError("We need at least two players");
            return;
        } else if (parseInt(e.target.value.toNumber) + parseInt(props.humanPlayerAmount)>3) {
            // console.log("TOTAL PLAYER AMOUNT: ", e.target.value + humanPlayerAmount)
            props.setComputerPlayerAmountError("Sorry. There's a max of three players per game");
        } else {
            props.setComputerPlayerAmountError("");
        };
    };

    const handleP1NameChange = (e) => {
        props.setPlayer1Name(e.target.value);
        if (e.target.value.length>0) {
            props.setPlayer1NameError("")
        };
    };
    const handleP2NameChange = (e) => {
        props.setPlayer2Name(e.target.value);
        if (e.target.value.length>0) {
            props.setPlayer2NameError("")
        };
    };

    const handleP3NameChange = (e) => {
        props.setPlayer3Name(e.target.value);
        if (e.target.value.length>0) {
            props.setPlayer3NameError("")
        };
    };

    const disabled= !!props.humanPlayerAmountError || !!props.computerPlayerAmountError || !!props.player1NameError || !!props.player2NameError || !!props.player3NameError;
    const gotRequiredInfo = !!props.humanPlayerAmount && (parseInt(props.humanPlayerAmount)
        + parseInt(props.computerPlayerAmount)<4) && (parseInt(props.humanPlayerAmount) + 
        parseInt(props.computerPlayerAmount)>1)&&(props.player1Name!=="")//NEED TO FINISH THIS
            // "SECURITY CHECK FOR THE NAMES OF HUMAN PLAYERS"

    const clearForm = () => {
        props.setHumanPlayerAmount(0);
        props.setComputerPlayerAmount(0);
        props.setComputerDifficultyLevel(1);
        props.setPlayer1Name("");
        props.setPlayer2Name("");
        props.setPlayer3Name("");
    };

    const setSubmissionErrors = () => {
        if (props.humanPlayerAmount===0){
            props.setHumanPlayerAmountError("We need at least one Human Player.")
        };
        if (props.player1Name === "") {
            props.setPlayer1NameError(playerNameError);
        };
        if (props.humanPlayerAmount>1 && props.player2Name === ""){
            props.setPlayer2NameError(playerNameError);
        };
        if (props.humanPlayerAmount>2 && props.player3Name === ""){
            props.setPlayer3NameError(playerNameError);
        };
        if (props.humanPlayerAmount<2 && props.computerPlayerAmount===0){
            props.setComputerPlayerAmountError("We need at least two players.")
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!gotRequiredInfo) {
            setSubmissionErrors();
            return
        } else {
            // console.log("SETTINGS.JS' INFO FOR FORM SUBMITION: ",
            // props.humanPlayerAmount, props.computerPlayerAmount,
            // props.computerDifficultyLevel, props.player1Name,
            // props.player2Name, props.player3Name);
            props.submitForm({
                "human_player_amount":props.humanPlayerAmount,
                "computer_player_amount":props.computerPlayerAmount,
                "computer_difficulty_level":props.computerDifficultyLevel,
                "player1_name":props.player1Name,
                "player2_name":props.player2Name,
                "player3_name":props.player3Name
            });
            clearForm();
        };
    };

    // console.log("PLAYER 1'S NAME: ", player1Name)
    // console.log(`SETTINGS.JS' "DISABLED" VALUE`, disabled)
    // console.log("SETTINGS.JS' PROPS: ", props)
    // console.log("SETTINGS.JS' GOTREQUIREDINFO: ", gotRequiredInfo)

    return (
        <form
        className="form"
        onSubmit={handleSubmit}
        >
            <h1>Initial Settings</h1>
            <label htmlFor="number-of-human-players" >How many human players?</label>
            <input
            type="number"
            min="1"
            max="3"
            name="number-of-human-players"
            id="number-of-human-players"
            value={props.humanPlayerAmount}
            onChange= {e => handleHumanPlayerAmountChange(e)}
            />
            {props.humanPlayerAmountError?<p className="error-message">{props.humanPlayerAmountError}</p>:null}

            <label htmlFor="player1name" >First player's name?</label>
            <input
            type="text"
            minLength="1"
            max="7"
            name="player1name"
            id="player1name"
            value={props.player1Name}
            onChange={handleP1NameChange}
            />
            {props.player1NameError?<p className="error-message">{props.player1NameError}</p>:null}


            {props.humanPlayerAmount>1?
            <>
                <label htmlFor="player2name" >Second player's name?</label>
                <input
                type="text"
                minLength="1"
                max="7"
                name="player2name"
                id="player2name"
                value={props.player2Name}
                onChange={handleP2NameChange}
                />
                {props.setHumanPlayerAmountErrorplayer2NameError?<p className="error-message">{props.setHumanPlayerAmountErrorplayer2NameError}</p>:null}
            </>
            : null}

            {props.humanPlayerAmount>2?
            <>
                <label htmlFor="player3name" >Third player's name?</label>
                <input
                type="text"
                minLength="1"
                max="7"
                name="player3name"
                id="player3name"
                value={props.player3Name}
                onChange={handleP3NameChange}
                />
                {props.setHumanPlayerAmountErrorplayer3NameError?<p className="error-message">{props.setHumanPlayerAmountErrorplayer3NameError}</p>:null}
            </>
            : null}

            {props.humanPlayerAmount<3?
            <>
                <label htmlFor="number-of-computer-players" >How many computer players?</label>
                <input
                type="number"
                min={props.humanPlayerAmount<2?1:0}
                max={3-props.humanPlayerAmount}
                name="number-of-computer-players"
                id="number-of-computer-players"
                value={props.computerPlayerAmount}
                onChange= {e => handleComputerPlayerAmountChange(e)}
                />
                {props.setHumanPlayerAmountErrorcomputerPlayerAmountError?<p className="error-message">{props.computerPlayerAmountError}</p>:null}
            </>
            : null}

            {props.computerPlayerAmount>0?
            <>
                <label htmlFor="computer-difficulty-level" >Computer player(s) difficulty level?</label>
                <input
                type="number"
                min="1"
                max="10"
                name="computer-difficulty-level"
                id="computer-difficulty-level"
                value={props.computerDifficultyLevel}
                onChange= {(e) => props.setComputerDifficultyLevel(e.target.value)}
                />
                {props.computerDifficultyLevel<1 || props.computerDifficultyLevel>10?<p className="error-message">"Pick a number from 1 - 10"</p>:null}
            </>
            :null}

            <input
            style={disabled?{border: "1px solid #999999", backgroundColor: "#cccccc", color: "#666666", cursor: "not-allowed"}:null}
            disabled={disabled}
            className="button"
            type="submit"
            value="Let's Begin!"
            aria-label="On Click"
            />
        </form>
    );
};
