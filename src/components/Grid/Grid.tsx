import React from 'react';
import  Row  from '../Row/Row';
import './Grid.css';
import { solutionWords } from '../../App';

export default function Grid ({guessList, attemptNumber}: {guessList: string[], attemptNumber: number}) {


    function getGuessStyle(row: number): string[] {

        let guessStyle: string[] = [];

        if (attemptNumber - 1 >= row){
            
            for(let i=0; i < guessList[row].length; i++){
                if (guessList[row][i] === solutionWords[0][i]){
                    console.log("equal")
                    guessStyle.push('green');
                } else if (solutionWords[0].includes(guessList[row][i])){
                    console.log("includes")
                    guessStyle.push('yellow');
                }
                else {
                    console.log("not includes")
                    guessStyle.push('grey');
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