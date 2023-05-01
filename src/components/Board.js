import LetterCard from './LetterCard';

export default function Board(props) {

  return (
    
    <div className="board">
      <div className="phrase">
        {props.puzzlePhrase.split(" ").map((word,index) =>
          <ul key={index} className="word">
            {word.split("").map((letter,index) =>
              <li key={index}>
                <LetterCard
                  letter={props.guessedLetters.indexOf(letter)>=0 || props.allLetters.indexOf(letter)<0?letter:" "}
                  latestLetter={props.latestLetter}
                />
              </li>
            )}
          </ul>
        )}
      </div>
      <h3 className="puzzle-type">{props.puzzleType}</h3>
    </div>
  );
};