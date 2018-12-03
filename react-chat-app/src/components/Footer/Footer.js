import React from 'react';
import './Footer.css';

class Footer extends React.Component {

    handleInputChange = (e) => {
        this.props.onInputChange(e.target.value);
    }

    keyListener = (event) => {
        if (event.keyCode === 13 && event.ctrlKey) this.props.onSend();
    }

    render() {
        return( 
            <footer className="Footer" data-grid="va-stretch">
                <div className="Footer-textarea-container">
                    <textarea className="Footer-textarea" placeholder="Ctrl+Enter для отправки" onKeyDown = {this.keyListener} onChange={this.handleInputChange} value={this.props.inputValue}></textarea>
                </div>
                <div className='Footer-gap'></div>
                <div className="Footer-button" onClick={this.props.onSend}><i className="Footer-button-icon far fa-paper-plane"></i></div>
            </footer>
        )}
}

export default Footer;