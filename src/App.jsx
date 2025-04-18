import React from 'react'
import clsx from 'clsx'
import { useState } from 'react'
import './App.css'
import Header from './components/Header'
// import Status from './components/Status'
import LanguageChips from './components/LanguageChips'
import { languages } from './components/languages'
import { getFarewellText, getRandomWord } from './components/utils'
import Confetti from 'react-confetti'

function App() {

  const [currentWord, setCurrentWord] = useState(() => getRandomWord())
  const [guessedLetters, setGuessedLetters] = useState([])

  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
  
  const remainingGuesses =  languages.length - 1
  const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter))
  const isGameLost = wrongGuessCount >= remainingGuesses
  const isGameOver = isGameWon || isGameLost
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
  const isLastGuessWrong = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)
  

  const alphabet = "qwertyuiopasdfghjklzxcvbnm"

  function resetGame() {
    setCurrentWord(getRandomWord())
    setGuessedLetters([])
  }

  function getGuessedLetter(letter) {
    setGuessedLetters(prevGuessed => 
        prevGuessed.includes(letter) ? prevGuessed : [...prevGuessed, letter]
    )
  }

  const letterElements = currentWord.split("").map((letter, index) => {
    const revealLetters = isGameLost || guessedLetters.includes(letter)
    const lettersClass = clsx(
      isGameLost && !guessedLetters.includes(letter) && "missed-letters"
    )
    return (
      <span key={index} className={lettersClass}>
        {revealLetters ? letter.toUpperCase() : ""}
      </span>
    )
  })

  

  const keys = alphabet.split("").map(letter => {

    const isGuessed = guessedLetters.includes(letter)
    const isCorrect = isGuessed && currentWord.includes(letter)
    const isWrong = isGuessed && !currentWord.includes(letter)
    const className = clsx({
        correct: isCorrect,
        wrong: isWrong,  
    })

    return(
      <button 
          aria-label={`letter ${letter}`}
          onClick={() => getGuessedLetter(letter)} 
          key={letter}
          className={className}
      >
          {letter.toUpperCase()}
      </button>
    )
  })


  const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessWrong
  }) 


  return (
    <main>
      {isGameWon && <Confetti />}
      <Header />


      {!isGameOver && isLastGuessWrong ? <section className={gameStatusClass}> 
          <p>
            {getFarewellText(languages[wrongGuessCount - 1].name)}
          </p>
      </section> : isGameWon ? <section className={gameStatusClass}> 
          <h2>You Win!</h2>
          <p>Congratulations, well done! 🎉</p>
      </section> : isGameLost ? <section className={gameStatusClass}> 
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
      </section> : null}


      <LanguageChips wrongGuessCount={wrongGuessCount} />


      <section className='word'>
        {letterElements}
      </section>


      <section 
        className="sr-only" 
        aria-live="polite" 
        role="status"
      >
        <p> 
          {currentWord.includes(lastGuessedLetter) ? 
          `You're correct! ${lastGuessedLetter} is in the word!` : 
          `Sorry! ${lastGuessedLetter} is not in the word`}
          You have {remainingGuesses} attempts left.
        </p>
        <p>Current word: {currentWord.split("").map(letter => 
           guessedLetters.includes(letter) ? letter + "." : "blank.")
           .join(" ")}
        </p>
      </section>


      {!isGameOver && <section className='keyboard-container'>
        <div className='keyboard'>{keys}</div>
      </section>}
      {isGameOver ? <button onClick={resetGame} className="new-game">New Game</button> : null}
    </main>
  )
}

export default App
