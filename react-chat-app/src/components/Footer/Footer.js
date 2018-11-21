import React from 'react';
import './Footer.css';

const Footer = () => (
    <footer className="Footer" data-grid="va-stretch">
    <div className="Footer-textarea-container">
    <textarea className="Footer-textarea"></textarea>
    </div>
    <div style={{"flex-basis": '5%'}}></div>
    <div className="Footer-button"><i class="Footer-button-icon far fa-paper-plane"></i></div>
    </footer>
)

export default Footer;