import React, { Component } from 'react';
import Header from '../Header/Header';
import AuthDialog from '../AuthDialog/AuthDialog';
import FooterContainer from '../../containers/FooterContainer';
import ChatSpace from '../ChatSpace/ChatSpace';
import { connect } from 'react-redux';
import { logOut, logIn, updateMessagePool } from '../../redux/actions';
import './App.css';
import {db} from '../../firebase';

class App extends Component {
  componentDidMount() {
    this.messagesRef = db.ref('messages');
    this.messagesRef.on('value', (snapshot) => {this.props.updateMessagePool(Object.values(snapshot.val()))})
  }
  render() {
    return (
      <div className="App">
        <AuthDialog isOpened={!this.props.userName} onLogIn={this.props.handleLogIn}/>
        <Header onLogOut={this.props.handleLogOut}>{this.props.userName}</Header>
        <ChatSpace messages={this.props.messages} userName = {this.props.userName}/>
        <FooterContainer userName={this.props.userName}/>
      </div>
    );
  }
}

const mapStateToProps = ({userName, messages}) => ({
  userName, messages
})

const mapDispatchToProps = (dispatch) => ({
  handleLogOut() {
    dispatch(logOut());
  },
  updateMessagePool(messages) {
    dispatch(updateMessagePool(messages));
  },
  handleLogIn(userName) {
    if (userName) dispatch(logIn(userName));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
