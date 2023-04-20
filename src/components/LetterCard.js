

export default function LetterCard(props) {

    // console.log("LETTERCARD.JS PROPS: ", props);

  return (
    <div className={props.latestLetter===props.letter?"letter-turning":"letter-card"}>{props.letter}</div>
  )
}
