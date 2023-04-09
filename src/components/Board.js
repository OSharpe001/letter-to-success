import { Puzzles } from '../assets/puzzles'
import LetterCard from './LetterCard';

export default function Board() {

  const puzzleChoice = Puzzles[Math.floor(Math.random()*Puzzles.length)];
  const puzzleType = puzzleChoice.type;
  const puzzlePhrase = puzzleChoice.phrases[Math.floor(Math.random()*puzzleChoice.phrases.length)]
  const puzzlePhraseLetters=[...puzzlePhrase]

  // console.log("BOARD.JS CURRENT RANDOM PUZZLECHOICE: ", puzzleChoice);
  // console.log("BOARD.JS CURRENT RANDOM PUZZLETYPE: ", puzzleType);
  // console.log("BOARD.JS CURRENT RANDOM PUZZLEPHRASE: ", puzzlePhrase);
  // console.log("BOARD.JS CURRENT RANDOM PUZZLEPHRASELETTERS: ", puzzlePhraseLetters);

  return (
    <div className="board">
        <ul className="phrase">
          {puzzlePhraseLetters.map(letter =>
            <li key={letter}>
              <LetterCard
                letter={letter.toUpperCase()}
              />
            </li>
          )}
        </ul>
        <h3>{puzzleType}</h3>
    </div>
  );
};