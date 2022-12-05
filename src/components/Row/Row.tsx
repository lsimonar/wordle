import React from 'react';
import './Row.css';

export default function Row({guess, guessStyle}: {guess: string, guessStyle: string[]}){
    
    const guessArray = guess.split("");

    const Tile = ({letter, letterStyle}: {letter: string, letterStyle: string}) => {

        return (
            <div className={`square-tile ${letterStyle}`}>{letter}</div>
        )
    }
    
    const generateRow = () => {
        let row : JSX.Element[] = [];
    
        for(let i = 0; i < 5; i++){
            row.push(<Tile key={i} letter={guessArray[i]} letterStyle={guessStyle[i]} />);
        }
        return row;
    }

    return(
        <div className="row-ctn">{generateRow()}</div>
    )
}