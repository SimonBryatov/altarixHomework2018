import React, { Component } from 'react';
import Header from '../Header/Header';
import AuthDialog from '../AuthDialog/AuthDialog';
import FooterContainer from '../../containers/FooterContainer';
import ChatSpaceContainer from '../../containers/ChatSpaceContainer';
import { connect } from 'react-redux';
import { logOut } from '../../redux/actions';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AuthDialog isOpened={!this.props.userName}/>
        <Header onLogOut={this.props.handleLogOut}>{this.props.userName}</Header>
        <ChatSpaceContainer/>
        <FooterContainer/>
      </div>
    );
  }
}

const mapStateToProps = ({userName}) => ({
  userName
})

const mapDispatchToProps = (dispatch) => ({
  handleLogOut() {
    dispatch(logOut());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
