import React, { Component } from 'react';
import Header from '../Header/Header';
import AuthDialog from '../AuthDialog/AuthDialog';
import Footer from '..//Footer/Footer';
import ChatSpace from '../ChatSpace/ChatSpace';
import { connect } from 'react-redux';
import { logOut, logIn, updateMessagePool, inputValueChange } from '../../redux/actions';
import './App.css';
import {db} from '../../firebase';

class App extends Component {

  componentDidMount() {
    this.messagesRef = db.ref('messages');
    this.messagesRef.on('value', (snapshot) => {this.props.updateMessagePool(Object.values(snapshot.val()))})
  }

  onInputChange = (value) => {
      this.props.handleInputChange(value);
  }

  sendMessage = () => {
      let text = this.props.inputValue;
      if (text !== '') {
          this.props.handleInputChange('');
          let now = Date.now();
          let message = {
              id: now, 
              text,
              name: this.props.userName
          }
          db.ref(`/messages/${now}`).set(message);
      }
  }

  render() {
    return (
      <div className="App">
        <AuthDialog isOpened={!this.props.userName} inputValue={this.props.inputValue} onInputChange={this.onInputChange} onLogIn={this.props.handleLogIn}/>
        <Header onLogOut={this.props.handleLogOut}>{this.props.userName}</Header>
        <ChatSpace messages={this.props.messages} userName = {this.props.userName}/>
        <Footer messages={this.props.messages} onSend={this.sendMessage} onInputChange={this.onInputChange} inputValue={this.props.inputValue} />
      </div>
    );
  }
}

const mapStateToProps = ({userName, messages, inputValue}) => ({
  userName, messages, inputValue
})

const mapDispatchToProps = (dispatch) => ({
  handleLogOut() { dispatch(logOut())},
  updateMessagePool(messages) {dispatch(updateMessagePool(messages))},
  handleLogIn(userName) {dispatch(logIn(userName))},
  handleInputChange(value) {dispatch(inputValueChange(value))}
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
