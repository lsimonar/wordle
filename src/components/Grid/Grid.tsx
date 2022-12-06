import React from 'react';
import  Row  from '../Row/Row';
import './Grid.css';

export default function Grid ({guessList, attemptNumber, solutionWord}: {guessList: string[], attemptNumber: number, solutionWord: string}) {

    function getGuessStyle(row: number): string[] {

        let guessStyle: string[] = [];
        let solutionArray: string[] = solutionWord.split("");

        if (attemptNumber - 1 >= row){
            guessStyle = new Array(5).fill('grey');
            solutionArray.forEach( (letter, i) => {
                if(guessList[row][i] === letter ){
                    guessStyle[i] = 'green';
                    solutionArray[i] = '';
                }
            });

            for(let i=0; i < guessList[row].length; i++){
                
                if (solutionArray.includes(guessList[row][i])){
                    guessStyle[i] = 'yellow';
                    solutionArray[solutionArray.indexOf(guessList[row][i])] = '';
                }
            }

        }
        return guessStyle;
    }

    const generateGrid = () => {
        let grid : JSX.Element[] = [];

        for(let i=0; i < 6; i++){
            grid.push(<Row key={i} guess={guessList[i]} guessStyle={getGuessStyle(i)} />)
        }

        return grid;
    }

    return (
        <div className="grid-ctn">
            {generateGrid()}
        </div>
    )
}