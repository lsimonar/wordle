import React, { useState, useEffect } from 'react';
import './App.css';
import Grid from './components/Grid/Grid';
import Keyboard, { keys } from './components/Keyboard/Keyboard';

function App() {

  const [attemptNumber, setAttemptNumber] = useState<number>(0);
  const [guessList, setGuessList] = useState<string[]>(new Array(6).fill(""));
  const [solutionWord, setSolutionWord] = useState<string | undefined>();
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [hasLost, setHasLost] = useState<boolean>(false);

  const playAgain = () => {
    setHasWon(false);
    setHasLost(false);
    setGuessList(new Array(6).fill(""));
    setAttemptNumber(0);
    fetchWord();
  }

  const handleKeyPress = (letter: string) => {

    if(!hasWon && !hasLost){
      let guess = [...guessList]
      if(letter === "ENTER"){
        if(guessList[attemptNumber].length === 5){
          if(attemptNumber < 5){
            if(guess[attemptNumber] === solutionWord){
              setHasWon(true);
              setAttemptNumber(attemptNumber + 1);
            } else {
              setAttemptNumber(attemptNumber + 1);
            }
            return
          } else {
            setHasLost(true);
            setAttemptNumber(attemptNumber + 1);
          }
        } else{
          alert("Word too short!")
        }    
      } else if(letter === '⌫' || letter === 'BACKSPACE') {
          guess[attemptNumber] = guess[attemptNumber].slice(0, -1);
          setGuessList(guess);
          return
      } else if(guessList[attemptNumber].length < 5){
          guess[attemptNumber] += letter
          setGuessList(guess);
          return
      }
    }

  }

  const fetchWord = async () => {
    const response = await fetch(`https://random-word-api.herokuapp.com/word?length=5&lang=es`);
    const jsonBody = await response.json();
    setSolutionWord(jsonBody[0].toUpperCase())
  } 

  useEffect(() => {
    fetchWord();
  }, [])

  useEffect(() => {
    const keyDownHandler = (event: any) => {
      let allKeys = keys.flat();
      if( ( allKeys.includes(event.key.toUpperCase() ) || (event.key === 'Backspace'))) {
        handleKeyPress(event.key.toUpperCase());
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [handleKeyPress]);
  console.log(solutionWord)
  return (
    <div>
      { solutionWord &&
        <div className="App-ctn">
          <Grid guessList={guessList} attemptNumber={attemptNumber} solutionWord={solutionWord}/>
          { hasLost &&
            <h1>The word was {solutionWord}!</h1>
          }
          { hasWon &&
            <h1>Well done!</h1>
          }
          { (hasLost || hasWon) &&
            <button onClick={playAgain}>Play Again</button>
          }
          { !hasWon && !hasLost &&
            <Keyboard onKeyPress={handleKeyPress}/>
          }
        </div>
      }
    </div>
  );
}

export default App;
