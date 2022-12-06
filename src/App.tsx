import React, { useState, useEffect } from 'react';
import './App.css';
import Grid from './components/Grid/Grid';
import Keyboard, { keys } from './components/Keyboard/Keyboard';

function App() {

  const [attemptNumber, setAttemptNumber] = useState<number>(0);
  const [guessList, setGuessList] = useState<string[]>(new Array(6).fill(""));
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [solutionWord, setSolutionWord] = useState<string | undefined>();

  const handleKeyPress = (letter: string) => {
    let guess = [...guessList]
    if(letter === "ENTER"){
      if(guessList[attemptNumber].length === 5){
        setAttemptNumber(attemptNumber + 1);
        return
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

  useEffect(() => {
    const fetchWord = async () => {
      const response = await fetch(`https://random-word-api.herokuapp.com/word?length=5`);
      const jsonBody = await response.json();
      setSolutionWord(jsonBody[0].toUpperCase())
    } 
    fetchWord();
    setIsLoaded(true);
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
  }, [guessList, attemptNumber]);
  console.log(solutionWord)
  return (
    <div>
      { solutionWord &&
        <div className="App-ctn">
          <Grid guessList={guessList} attemptNumber={attemptNumber} solutionWord={solutionWord}/>
          <Keyboard onKeyPress={handleKeyPress}/>
        </div>
      }
    </div>
  );
}

export default App;
