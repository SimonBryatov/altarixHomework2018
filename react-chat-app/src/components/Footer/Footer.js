import React from 'react';
import './Footer.css';

class Footer extends React.Component {
    
    state = {input: ''}
    
    onInputChange = (e) => {
        this.setState({input: e.target.value})
    }

    sendMessage = () => {
        if (!this.state.input) return
        this.props.onSend(this.state.input)
        this.setState({input: ''});
    }

    keyListener = (event) => {
        if (event.keyCode === 13 && event.ctrlKey) this.sendMessage();
    }

    render() {
        return( 
            <footer className="Footer" data-grid="va-stretch">
                <div className="Footer-textarea-container">
                    <textarea className="Footer-textarea" placeholder="Ctrl+Enter для отправки" onKeyDown = {this.keyListener} onChange={this.onInputChange} value={this.state.input}></textarea>
                </div>
                <div className='Footer-gap'></div>
                <div className="Footer-button" onClick={this.sendMessage}><i className="Footer-button-icon far fa-paper-plane"></i></div>
            </footer>
        )}
}

export default Footer;