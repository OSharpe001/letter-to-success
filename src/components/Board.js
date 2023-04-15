// import { Puzzles } from '../assets/puzzles'
import LetterCard from './LetterCard';

export default function Board(props) {

  // const puzzleChoice = Puzzles[Math.floor(Math.random()*Puzzles.length)];
  // const puzzleType = puzzleChoice.type;
  // const puzzlePhrase = puzzleChoice.phrases[Math.floor(Math.random()*puzzleChoice.phrases.length)].toUpperCase()
  // const puzzlePhraseLetters=[...puzzlePhrase]

  // console.log("BOARD.JS CURRENT RANDOM PUZZLECHOICE: ", puzzleChoice);
  // console.log("BOARD.JS CURRENT RANDOM PUZZLETYPE: ", puzzleType);
  // console.log("BOARD.JS CURRENT RANDOM PUZZLEPHRASE: ", props.puzzlePhrase);
  // console.log("BOARD.JS PROPS.GUESSEDLETTERS: ", props.guessedLetters);
  // console.log("HEY: ", props.guessedLetters.filter(guessed=>guessed==="R").length);
  // console.log("HOY: ", props.guessedLetters.indexOf("R"));
  // console.log("BOARD.JS CURRENT RANDOM PUZZLEPHRASELETTERS: ", puzzlePhraseLetters);

  return (
    <div className="board">
      {props.puzzlePhrase}
      <div className="phrase">
        {props.puzzlePhrase.split(" ").map((word,index) =>
          <ul key={index} className="word">
            {word.split("").map((letter,index) =>
              <li key={index}>
                <LetterCard
                  letter={props.guessedLetters.indexOf(letter)>=0 || props.allLetters.indexOf(letter)<0?letter:" "}
                />
              </li>)}
          </ul>)}
        </div>
        <h3 className="puzzle-type">{props.puzzleType}</h3>
    </div>
  );
};