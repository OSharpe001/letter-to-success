import { Puzzles } from '../assets/puzzles'
import LetterCard from './LetterCard';

export default function Board() {

  const puzzleChoice = Puzzles[Math.floor(Math.random()*Puzzles.length)];
  const puzzleType = puzzleChoice.type;
  const puzzlePhrase = puzzleChoice.phrases[Math.floor(Math.random()*puzzleChoice.phrases.length)]
  // const puzzlePhraseLetters=[...puzzlePhrase]

  // console.log("BOARD.JS CURRENT RANDOM PUZZLECHOICE: ", puzzleChoice);
  // console.log("BOARD.JS CURRENT RANDOM PUZZLETYPE: ", puzzleType);
  // console.log("BOARD.JS CURRENT RANDOM PUZZLEPHRASE: ", puzzlePhrase);
  // console.log("BOARD.JS CURRENT RANDOM PUZZLEPHRASELETTERS: ", puzzlePhraseLetters);

  return (
    <div className="board">
      {puzzlePhrase}
      <div className="phrase">
        {puzzlePhrase.split(" ").map(word =>
          <ul className="word">
            {word.split("").map((letter,index) =>
              <li key={index}>
                <LetterCard
                  letter={letter.toUpperCase()}
                />
              </li>)}   
          </ul>)} 
        </div>
        <h3>{puzzleType}</h3>
    </div>
  );
};