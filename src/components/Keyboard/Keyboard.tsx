import React from 'react';
import './Keyboard.css';

const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
const row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
const row3 = ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"]

export default function Keyboard({onKeyPress}: {onKeyPress: any}) {

    const Key = ({value}: {value: string}) => {
        return <div onClick={() => onKeyPress(value)} className="key">{value}</div>
    }

    const generateKeyboardRow = (row: string[]) => {
        let keyBoardRow : JSX.Element[] = [];
        row.forEach((keyValue, i) => {
            keyBoardRow.push(<Key key={i} value={keyValue}/> )
        })
        return keyBoardRow;
    }
    
    const generateKeyboard =  () => {
        return(
            <> 
                <div className="keyboard-row-ctn">{generateKeyboardRow(row1)}</div>
                <div className="keyboard-row-ctn">{generateKeyboardRow(row2)}</div> 
                <div className="keyboard-row-ctn">{generateKeyboardRow(row3)}</div> 
            </>
        )
    }

    return(
        <div className='keyboard-ctn'>{generateKeyboard()}</div>
    )
}