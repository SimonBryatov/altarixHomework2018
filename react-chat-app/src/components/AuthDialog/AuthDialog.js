import React from 'react';
import './AuthDialog.css';

class AuthDialog extends React.Component {
    state={ login: '' }
    setInput = (e) => {
        this.setState({login: e.target.value})
    }
    handleLogIn = () => {
        this.props.onLogIn(this.state.login);
        this.setState({ login: '' });
    }
    render() {
        return(    
            this.props.isOpened ? 
                <div className='AuthDialog'>
                    <div className='AuthDialog-form'>
                    <h2>Чатик</h2>
                    <input className='AuthDialog-input' placeholder='Логин' value={this.state.login} onChange={this.setInput}></input>
                    <button onClick={this.handleLogIn} className='AuthDialog-button'>Войти</button>
                    </div>
                </div>
            : null
            )
    }
    }

export default AuthDialog