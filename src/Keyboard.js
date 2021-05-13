import React from 'react'
import PropTypes from 'prop-types'

import './Keyboard.css'

const ALPHABET = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

const Keyboard = ({usedLetters, onClickAddLetter}) => (
    ALPHABET.map((letter, index) => (
        <div 
        key={index} 
        className={(usedLetters.includes(letter) ? "used" : "unused") + ' letterKeyboard'}
        onClick = {() => onClickAddLetter(letter)}
        >
            {letter}
        </div>
    ))
)

Keyboard.propTypes = {
    usedLetters: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClickAddLetter: PropTypes.func.isRequired
}


export default Keyboard