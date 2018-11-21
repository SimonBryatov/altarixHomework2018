import React, { Component } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ChatSpace from '../ChatSpace/ChatSpace';
import './App.css';

let messages = [{from: 'Федор Анон', text: 'Hello!', isMine: false}, {from: 'Я', text: 'Hello!', isMine: true}, {from: 'Федор Анон', text: 'Hello!', isMine: false}]
messages = messages.concat(messages);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header>Павел Анонимович</Header>
        <ChatSpace messages={messages}/>
        <Footer/>
      </div>
    );
  }
}

export default App;
