import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import AuthDialog from './components/AuthDialog/AuthDialog';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AuthDialog />
        <Grid container direction='row' justify='center'>
          
        </Grid>
      </div>
    );
  }
}

export default App;
