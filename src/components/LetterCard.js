export default function LetterCard(props) {

  return (

    <div className={props.latestLetter===props.letter?"letter-turning":"letter-card"}>{props.letter}</div>
  )
}
