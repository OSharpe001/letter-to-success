import { useState } from "react";
import { Footer } from "../components";
import { cheering_kids } from "../assets/sounds";

export default function Settings({ submitForm, sound }) {

    const [humanPlayerAmount, setHumanPlayerAmount] = useState(1);
    const [computerPlayerAmount, setComputerPlayerAmount] = useState(0);
    const [player1Name, setPlayer1Name] = useState("");
    const [player1NameError, setPlayer1NameError] = useState("");
    const [player2Name, setPlayer2Name] = useState("");
    const [player2NameError, setPlayer2NameError] = useState("");
    const [player3Name, setPlayer3Name] = useState("");
    const [player3NameError, setPlayer3NameError] = useState("");
    const [humanPlayerAmountError, setHumanPlayerAmountError] = useState("");
    const [computerPlayerAmountError, setComputerPlayerAmountError] = useState("");
    const [computerDifficultyLevel, setComputerDifficultyLevel] = useState(1);
    const [computerDifficultyError, setComputerDifficultyError] = useState("");

    const playerNameError = "Human players need a unique name.";

    const cheeringKids = new Audio(cheering_kids);
    cheeringKids.volume = .8;

    const handleHumanPlayerAmountChange = (e) => {
        setHumanPlayerAmount(e.target.value);
        if (parseInt(e.target.value) < 1) {
            setHumanPlayerAmountError("We need at least one Human Player...");
            return;
        } else if (parseInt(e.target.value) === 3) {
            setComputerPlayerAmount(0);
            setComputerPlayerAmountError("");
            setHumanPlayerAmountError("");
        } else if (parseInt(e.target.value) > 3) {
            setHumanPlayerAmountError("Sorry. There's a max of three players per game");
            setComputerPlayerAmountError("");
        } else if (parseInt(e.target.value) < 2) {
            setPlayer2Name("");
            setPlayer2NameError("");
            setPlayer3Name("");
            setPlayer3NameError("");
            setHumanPlayerAmountError("");
        } else if (parseInt(e.target.value) < 3) {
            setPlayer3Name("");
            setPlayer3NameError("");
            setComputerPlayerAmountError("");
            setHumanPlayerAmountError("");
        } else {
            setHumanPlayerAmountError("");
        };
    };

    const handleComputerPlayerAmountChange = (e) => {
        setComputerPlayerAmount(e.target.value);
        if (!humanPlayerAmount || parseInt(humanPlayerAmount) > 3) {
            setComputerPlayerAmountError("Please set proper amount of Human Players, first.")
        } else if (parseInt(e.target.value) + parseInt(humanPlayerAmount) < 2) {
            setComputerPlayerAmountError("We need at least two players");
            return;
        } else if (parseInt(e.target.value) + parseInt(humanPlayerAmount) > 3) {
            setComputerPlayerAmountError("Sorry. There's a max of three players per game");
        } else {
            setComputerPlayerAmountError("");
        };
        if (parseInt(e.target.value === 0) || e.target.value === "") {
            setComputerDifficultyLevel("1");
            setComputerDifficultyError("");
        }
    };

    const handleP1NameChange = (e) => {
        setPlayer1Name(e.target.value);
        if (!(e.target.value.indexOf("Computer") < 0)) {
            setPlayer1NameError("Humans can't have that Player Name")
        } else if (e.target.value.length > 0 && (e.target.value !== player2Name || e.target.value !== player3Name)) {
            setPlayer1NameError("");
        };
    };

    const handleP2NameChange = (e) => {
        setPlayer2Name(e.target.value);
        if (!(e.target.value.indexOf("Computer") < 0)) {
            setPlayer2NameError("Humans can't have that Player Name")
        } else if (e.target.value.length > 0 || e.target.value !== player1Name || e.target.value !== player3Name) {
            setPlayer2NameError("");
        };
    };

    const handleP3NameChange = (e) => {
        setPlayer3Name(e.target.value);
        if (!(e.target.value.indexOf("Computer") < 0)) {
            setPlayer3NameError("Humans can't have that Player Name")
        } else if (e.target.value.length > 0 || e.target.value !== player1Name || e.target.value !== player2Name) {
            setPlayer3NameError("");
        };
    };

    const handleComputerDifficultyChange = (e) => {
        setComputerDifficultyLevel(e.target.value);
        if (parseInt(e.target.value) < 1 || parseInt(e.target.value) > 10) {
            setComputerDifficultyError("Pick a number from 1 (easy) - 10 (hard)");
        } else {
            setComputerDifficultyError("");
        };
    };

    const disabled = !!humanPlayerAmountError || !!computerPlayerAmountError || !!player1NameError || !!player2NameError || !!player3NameError || !!computerDifficultyError;
    const gotRequiredInfo = !!humanPlayerAmount && (parseInt(humanPlayerAmount) + parseInt(computerPlayerAmount) < 4) && (parseInt(humanPlayerAmount) + parseInt(computerPlayerAmount) > 1) && (player1Name !== "")
        && (parseInt(humanPlayerAmount) < 2 || (player2Name !== "" && player2Name !== player1Name)) && (parseInt(humanPlayerAmount) < 3 || (player3Name !== "" && player3Name !== player2Name && player3Name !== player1Name))
        && (!!computerDifficultyLevel || computerPlayerAmount === 0)
    const clearForm = () => {
        setHumanPlayerAmount(1);
        setComputerPlayerAmount(0);
        setComputerDifficultyLevel(1);
        setPlayer1Name("");
        setPlayer2Name("");
        setPlayer3Name("");
    };

    const setSubmissionErrors = () => {
        if (humanPlayerAmount === 0) {
            setHumanPlayerAmountError("We need at least one Human Player.")
        };
        if (player1Name === "") {
            setPlayer1NameError(playerNameError);
        };
        if (parseInt(humanPlayerAmount) > 1 && (player2Name === "" || player2Name === player1Name)) {
            setPlayer2NameError(playerNameError);
        };
        if (parseInt(humanPlayerAmount) > 2 && (player3Name === "" || player3Name === player1Name || player3Name === player2Name)) {
            setPlayer3NameError(playerNameError);
        };
        if (parseInt(humanPlayerAmount) + parseInt(computerPlayerAmount) < 2) {
            setComputerPlayerAmountError("We need at least two players.")
        };
        if (computerDifficultyLevel < 1 || computerDifficultyLevel > 10) {
            setComputerDifficultyError("Pick a number from 1 - 10.")
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!gotRequiredInfo) {
            setSubmissionErrors();
            return
        } else {
            sound && cheeringKids.play();
            setTimeout(() => {
                let humanPlayers = [player1Name, player2Name, player3Name].slice(0, humanPlayerAmount);
                const computerPlayers = [];
                const computerPlayerNameGenerator = () => {
                    for (let i = 0; i < parseInt(computerPlayerAmount); i++) {
                        computerPlayers.push("Computer " + (i + 1));
                    };
                };
                computerPlayerNameGenerator();

                submitForm({
                    "computerDifficultyLevel": parseInt(computerDifficultyLevel),
                    "computerPlayers": computerPlayers,
                    "humanPlayers": humanPlayers,
                });
                clearForm();
            }, 2000);
        };
    };

    return (
        <div
            className="settingsPage">
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
                    value={humanPlayerAmount}
                    onChange={e => handleHumanPlayerAmountChange(e)}
                />
                <p className="error-message">{humanPlayerAmountError}</p>

                <label htmlFor="player1name" >First player's name?</label>
                <input
                    type="text"
                    minLength="1"
                    max="7"
                    name="player1name"
                    id="player1name"
                    value={player1Name}
                    onChange={handleP1NameChange}
                />
                <p className="error-message">{player1NameError}</p>

                {humanPlayerAmount > 1 ?
                    <>
                        <label htmlFor="player2name" >Second player's name?</label>
                        <input
                            type="text"
                            minLength="1"
                            max="7"
                            name="player2name"
                            id="player2name"
                            value={player2Name}
                            onChange={handleP2NameChange}
                        />
                        <p className="error-message">{player2NameError}</p>
                    </>
                    : null}

                {humanPlayerAmount > 2 ?
                    <>
                        <label htmlFor="player3name" >Third player's name?</label>
                        <input
                            type="text"
                            minLength="1"
                            max="7"
                            name="player3name"
                            id="player3name"
                            value={player3Name}
                            onChange={handleP3NameChange}
                        />
                        <p className="error-message">{player3NameError}</p>
                    </>
                    : null}

                {humanPlayerAmount < 3 ?
                    <>
                        <label htmlFor="number-of-computer-players" >How many computer players?</label>
                        <input
                            type="number"
                            min={humanPlayerAmount < 2 ? 1 : 0}
                            max={3 - humanPlayerAmount}
                            name="number-of-computer-players"
                            id="number-of-computer-players"
                            value={computerPlayerAmount}
                            onChange={e => handleComputerPlayerAmountChange(e)}
                        />
                        <p className="error-message">{computerPlayerAmountError}</p>
                    </>
                    : null}

                {computerPlayerAmount > 0 ?
                    <>
                        <label htmlFor="computer-difficulty-level" >Computer player(s) difficulty level?</label>
                        <input
                            type="number"
                            min="1"
                            max="10"
                            name="computer-difficulty-level"
                            id="computer-difficulty-level"
                            value={computerDifficultyLevel}
                            onChange={(e) => handleComputerDifficultyChange(e)}
                        />
                        <p className="error-message">{computerDifficultyError}</p>
                    </>
                    : null}

                <input
                    style={disabled ? { border: "1px solid #999999", backgroundColor: "#cccccc", color: "#666666", cursor: "not-allowed" } : null}
                    disabled={disabled}
                    className="button"
                    type="submit"
                    value="Let's Begin!"
                    aria-label="On Click"
                />
            </form>
            <Footer />
        </div>
    );
};
