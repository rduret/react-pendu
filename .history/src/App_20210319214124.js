import './App.css';
import { Component } from 'react';
import Keyboard from './Keyboard';

const COUNT_MAX = 8;

class App extends Component{

  state = {
    unusedWords: ['scoobydoo', 'montre', 'verre', 'stylo', 'uranium', 'steak'],
    usedWords: [],
    count: 0,

    usedLetters: [],
    word: '',
    wordArray: [],
  }

  constructor(props){
    super(props);

    let randomIndex = Math.floor(Math.random() * (this.state.unusedWords.length));
    let newWord = this.state.unusedWords[randomIndex];
    
    this.state.usedWords.push(newWord);
    this.state.unusedWords.splice(randomIndex, 1);

    this.state.word = newWord;
    this.state.wordArray = this.getArrayFromWord(this.computeDisplay(this.state.word, this.state.usedLetters));
  }

  getNewWord() {
    //Si tous les mots ont été utilisés on remet à 0
    if(this.state.unusedWords.length === 0)
      [this.state.unusedWords, this.state.usedWords] = [this.state.usedWords, this.state.unusedWords]

    let { unusedWords, usedWords } = this.state;
    let randomIndex = Math.floor(Math.random() * (unusedWords.length));
    let newWord = unusedWords[randomIndex];
    let newUnusedWords = unusedWords
    newUnusedWords.splice(randomIndex, 1);

    this.setState({
      usedWords: [...usedWords, newWord],
      unusedWords: newUnusedWords,
      usedLetters: [],
      count: 0,
      word: newWord,
      wordArray: []
    });

    this.setState((prevState) => ({ wordArray: this.getArrayFromWord(this.computeDisplay(prevState.word, prevState.usedLetters))}))
  }

  addLetter = (letter) => {
    let { usedLetters, count, word } = this.state;

    if(!this.getArrayFromWord(word).includes(letter) ||usedLetters.includes(letter))
      this.setState({count: count + 1})

    if(!usedLetters.includes(letter))
      this.setState({usedLetters: [...usedLetters, letter]});

    this.setState((prevState) => ({ wordArray: this.getArrayFromWord(this.computeDisplay(word, prevState.usedLetters))}));
  }   

  getArrayFromWord(word){
    return word.split("");
  }

  computeDisplay(word, usedLetters) {
    return word.replace(/\w/g,(letter) => (usedLetters.includes(letter) ? letter : '_'))
  }

  render(){
    const { wordArray,usedLetters, count} = this.state;
    return (
      <div className="pendu">
        <div className="game">
          <div className="word">
            {wordArray.map((letter, index) => (
              <span key={index} className="letterWord">{letter}</span>
            ))}
          </div>

          <div className="keyboard">
            {(!wordArray.includes('_') || count>=COUNT_MAX) ?
              <button className="restart" onClick={() => this.getNewWord()}>Rejouer</button>
              :
              <Keyboard usedLetters={usedLetters} onClickAddLetter={this.addLetter}/>
            }
          </div>
        </div>

        <div className="infos">
          <span>{count}</span>
        </div>
      </div>
    );
  }
}

export default App;
