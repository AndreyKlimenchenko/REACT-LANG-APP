import {useEffect, useState} from 'react';
import './App.css';
import styles from './App.module.css';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import {BrowserRouter, NavLink, Route, Switch} from 'react-router-dom';
import Library from './components/Library/Library';
import Learn from './components/Learn/Learn';
import Games from './components/Games/Games';
import WriteIt from './components/Games/AppGames/WriteIt';
import CheckIt from './components/Games/AppGames/CheckIt';

function App() {
  const [library, setLibrary] = useState(JSON.parse(localStorage.getItem('library')) || [])
  const [wordIndex, setWordIndex] = useState(0)
  const [correctWords, setCorrectWords] = useState(0)
  const [errorWords, setErrorWords] = useState(0)
  const [points, setPoints] = useState(0)
  const [playWords, setPlayWords] = useState(library.slice(-10))

  useEffect(() => {
    setPoints(points + correctWords)
  }, [correctWords])

  const progressBarWidth = {
    width: `${(100 / library.slice(-10).length) * (wordIndex + 1)}vw`
  }
  const speak = (word) => {
    const speakInstance = new SpeechSynthesisUtterance(word)
    speakInstance.voice = speechSynthesis.getVoices()[51]
    speechSynthesis.speak(speakInstance)

  }

  return (
    <BrowserRouter>
      <Header />

      <Switch>
        <Route path='/dashboard'>
          <Dashboard />
        </Route>
        <Route path='/library'>
          <Library library={library} setLibrary={setLibrary} />
        </Route>
        <Route path='/games'>
          <Games />
        </Route>
        <Route path='/game/write-it'>
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBar} style={progressBarWidth}></div>
          </div>
          <nav className={styles.gameNav}>
          <NavLink className={styles.btnBack} to={'/games'}>

          </NavLink>
            <ul className={styles.results}>
              <li>Errors: {errorWords}</li>
              <li>Correct: {correctWords}</li>
              <li>Points: {points}</li>
            </ul>
          </nav>
          
          <section className={styles.gameContainer}>
            <WriteIt playWords={playWords} wordIndex={wordIndex} setWordIndex={setWordIndex}  
            correctWords={correctWords}
            setCorrectWords={setCorrectWords}
            errorWords={errorWords}
            setErrorWords={setErrorWords}
            speak={speak}
            />            
          </section>
        </Route>

        <Route path='/game/check-it'>
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBar} style={progressBarWidth}></div>
          </div>
          <nav className={styles.gameNav}>
          <NavLink className={styles.btnBack} to={'/games'}>

          </NavLink>
            <ul className={styles.results}>
              <li>Errors: {errorWords}</li>
              <li>Correct: {correctWords}</li>
              <li>Points: {points}</li>
            </ul>
          </nav>
          <section className={styles.gameContainer}>
            <CheckIt playWords={playWords} wordIndex={wordIndex} setWordIndex={setWordIndex}  
            correctWords={correctWords}
            setCorrectWords={setCorrectWords}
            errorWords={errorWords}
            setErrorWords={setErrorWords}
            speak={speak}
            />            
          </section>
        </Route>
    

        <Route path='/learn'>
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBar} style={progressBarWidth}></div>
          </div>
          <Learn speak={speak} library={library} wordIndex={wordIndex} setWordIndex={setWordIndex} />

          <div onClick={() => {
            if(wordIndex === library.length - 1) {
              setWordIndex(0)
            } else {
              setWordIndex(wordIndex + 1)
            }
          }} className={styles.btnNext}></div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
