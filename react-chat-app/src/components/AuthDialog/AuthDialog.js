import React from 'react';
import './AuthDialog.css';

class AuthDialog extends React.Component {
    state={login: '', password: ''}
    render() {
        return(    
            this.props.isOpened ? 
                <div className='AuthDialog'>
                    <div className='AuthDialog-form'>
                    <h2>Чатик</h2>
                    <input className='AuthDialog-input' placeholder='Логин'></input>
                    <input className='AuthDialog-input' placeholder='Пароль' type='password'></input>
                    <button className='AuthDialog-button'>Войти</button>
                    </div>
                </div>
            : null
            )
    }
    }

export default AuthDialog