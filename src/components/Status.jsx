import React from 'react'
import { languages } from './languages'
import { getFarewellText } from './utils'

export default function Status(props) {


  return (
    <>
      {!props.isGameOver && props.isLastGuessWrong ? <section id='status-section' className={props.gameStatusClass}> 
          <p>
            {getFarewellText(languages[props.wrongGuessCount - 1].name)}
          </p>
      </section> : props.isGameOver && props.isGameWon ? <section id='status-section' className={props.gameStatusClass}> 
          <h2>You Win!</h2>
          <p>Congratulations, well done! 🎉</p>
      </section> : props.isGameOver && props.isGameLost ? <section id='status-section' className={props.gameStatusClass}> 
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
      </section> : null}
    </>
  )
}
