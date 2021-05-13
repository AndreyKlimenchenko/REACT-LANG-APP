import React, {useRef, useState} from 'react';
import styles from './AppGames.module.css';


const WriteIt = ({setWordIndex, wordIndex, playWords, errorWords, setErrorWords, correctWords, setCorrectWords, speak}) => {
    const input = useRef();
    const [randomWords, setRandomWords] = useState(playWords.sort(() => Math.random() - 0.5))

    const checkWord = (event) => {
        event.preventDefault()
        if(input.current.value === randomWords[wordIndex].translate) {
            speak(randomWords[wordIndex].translate)
            setCorrectWords(correctWords + 1)
            if(wordIndex !== playWords.length - 1) {
                setWordIndex(wordIndex + 1)
            } else {
                alert('Game is over')
            }
            input.current.value = ''
        } else {
            setErrorWords(errorWords + 1)
        }
    }
    return (
        <section>
            <span>write a translation for this word</span>
            <h3>{randomWords[wordIndex].word}</h3>
            <form onSubmit={checkWord} className={styles.writeWordBlock}>
                <input ref={input} type="text"/>

                <button className={styles.btnOk}>OK</button>
            </form>
        </section>
    )
}

export default WriteIt