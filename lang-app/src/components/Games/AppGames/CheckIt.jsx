import React, {useEffect, useState, useMemo} from 'react';
import styles from './AppGames.module.css';


const CheckIt = ({setWordIndex, wordIndex, playWords, errorWords, setErrorWords, correctWords, setCorrectWords, speak}) => {
    
    const randomWords = useMemo(() => playWords.sort(() => Math.random() - 0.5), [])

    const [currentWords, setCurrentWords] = useState(['random', 'correct', 'random2'])
    useEffect(() => {
        setCurrentWords([
            randomWords[wordIndex].word,
            randomWords[(wordIndex + 1)%randomWords.length].word,
            randomWords[(wordIndex + 2)%randomWords.length].word
        ].sort(() => Math.random() - 0.5))
    }, [correctWords])

    const checkWord = (word) => {
        if(word === randomWords[wordIndex].word) {
            speak(randomWords[wordIndex].translate)
            setCorrectWords(correctWords + 1)
            if(wordIndex !== playWords.length - 1) {
                setWordIndex(wordIndex + 1)
            } else {
                alert('Game is over')
            }
        } else {
            setErrorWords(errorWords + 1)
        }
    }
    return (
        <section>
            <span>write a translation for this word</span>
            <h3>{randomWords[wordIndex].translate}</h3>
            <ul className={styles.btnContainer}>
                {currentWords.map((word, index) => (
                    <li className={styles.btnCheck} onClick={() => checkWord(word)}>{word}</li>
                ))}
            </ul>
        </section>
    )
}

export default CheckIt