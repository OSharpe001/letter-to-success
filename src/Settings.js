import { useState } from 'react'

export default function Settings() {

    const [humanPlayerAmount, setHumanPlayerAmount] = useState(0);
    const [computerPlayerAmount, setComputerPlayerAmount] = useState(0);
    const [humanPlayerAmountError, setHumanPlayerAmountError] = useState("");
    const [computerPlayerAmountError, setComputerPlayerAmountError] = useState("");

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
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!gotRequiredInfo) {
            setSubmissionErrors();
            return
        } else if (reservationTerms === false){
            alert("Do you agree to our terms of service?");
        } else {
                setOccasionError("");
                props.submitForm({
                    "first-name":props.info.firstName,
                    "last-name":props.info.lastName,
                    "email":props.info.email,
                    "phone":props.info.phone,
                    "seating":props.seating,
                    "date":resDate,
                    "time":resTime,
                    "guests":guests,
                    "occasion":occasion,
                    "requests":requests
                });
                clearForm();
        }
    };

  return (
    <form
    className="form"
    onSubmit={handleSubmit}
    >
        <p>Initial Settings</p>
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
