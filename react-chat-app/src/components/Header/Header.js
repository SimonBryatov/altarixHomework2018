import React from 'react';
import './Header.css';

const Header = ({children}) => (
    <header className="Header">
        <p className="Header-companionUserName">{children}</p>
    </header>
)

export default Header;