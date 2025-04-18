import React from 'react'
import { languages } from './languages'
import clsx from 'clsx'

export default function LanguageChips(props) {

    const langChips = languages.map((language, index) => {

      const isLanguageLost = index < props.wrongGuessCount

      const styles = {
          backgroundColor: language.backgroundColor,
          color: language.color
      }

      const className = clsx("chip", isLanguageLost && "lost" )

      return(
          <span 
            key={language.name} 
            className={className}
            style={styles}
          >
            {language.name}
          </span>
      )
    })

  return (
    <section className='languages-container'>
      {langChips}
    </section>
  )
}
