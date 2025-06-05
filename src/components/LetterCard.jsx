export default function LetterCard({ latestLetter, letter}) {

  return (

    <div className={latestLetter===letter?"letter-turning":"letter-card"}>{letter}</div>
  )
}
