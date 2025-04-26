import LetterCard from './LetterCard';

export default function Board({ puzzlePhrase, puzzleType, guessedLetters, latestLetter, allLetters }) {

  return (
    <div className="board">
      <div className="phrase">
        {puzzlePhrase.split(" ").map((word,index) =>
          <ul key={index} className="word">
            {word.split("").map((letter,index) =>
              <li key={index}>
                <LetterCard
                  letter={guessedLetters.indexOf(letter)>=0 || allLetters.indexOf(letter)<0?letter:" "}
                  latestLetter={latestLetter}
                />
              </li>
            )}
          </ul>
        )}
      </div>
      <h3 className="puzzle-type">{puzzleType}</h3>
    </div>
  );
};