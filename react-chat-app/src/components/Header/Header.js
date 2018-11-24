import React from 'react';
import './Header.css';

const Header = ({children, onLogOut}) => (
    <header className="Header">
        <p className="Header-userName">{children}</p>
        <div className="Header-button" onClick={onLogOut}><div className="Header-button_text">Выйти</div><i className="fas fa-sign-out-alt"></i></div>
    </header>
)

export default Header;