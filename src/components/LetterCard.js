// import React from 'react'

export default function LetterCard(props) {

    console.log("LETTERCARD.JS PROPS: ", props);

  return (
    <div className="letter-card">{props.letter}</div>

    // <>
    // <div className={props.letter===" "?"hidden":"letter-card"}>{props.letter}</div>
    // </>
  )
}
