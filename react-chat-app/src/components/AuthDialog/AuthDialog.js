import React from 'react';
import './AuthDialog.css';

class AuthDialog extends React.Component {

    handleLogIn = () => {
        const userName = this.props.inputValue;
        if (userName !=='') this.props.onLogIn(userName)
    }

    handleInputChange = (e) => {
        this.props.onInputChange(e.target.value);
    }

    render() {
        return(    
            this.props.isOpened ? 
                <div className='AuthDialog'>
                    <div className='AuthDialog-form'>
                    <h2>Чатик</h2>
                    <input className='AuthDialog-input' placeholder='Логин' onChange={this.handleInputChange} value={this.props.inputValue}></input>
                    <button onClick={this.handleLogIn} className='AuthDialog-button'>Войти</button>
                    </div>
                </div>
            : null
            )
    }
    }

export default AuthDialog