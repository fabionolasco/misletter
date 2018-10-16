import React, { Component } from 'react';
import Header from './Header/Header';
import Game from './Game/Game';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Game/>
      </div>
    );
  }
}

export default App;
