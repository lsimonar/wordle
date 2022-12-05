import React, { useState, useEffect } from 'react';
import './App.css';
import Grid from './components/Grid/Grid';
import Keyboard from './components/Keyboard/Keyboard';

export const solutionWords = ['GUAPO'];


function App() {

  const [attemptNumber, setAttemptNumber] = useState<number>(0);
  const [guessList, setGuessList] = useState<string[]>(new Array(6).fill(""));

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
    const keyDownHandler = (event: any) => {
      console.log('User pressed: ', event.key);
      handleKeyPress(event.key.toUpperCase());
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  return (
    <div className="App-ctn">
      <Grid guessList={guessList} attemptNumber={attemptNumber}/>
      <Keyboard onKeyPress={handleKeyPress}/>
    </div>
  );
}

export default App;
