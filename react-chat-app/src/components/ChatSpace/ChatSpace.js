import React from 'react';
import ChatMessage from '../ChatMessage/ChatMessage';
import './ChatSpace.css';

class ChatSpace extends React.Component { 

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.container.scrollTop = this.container.scrollHeight;
    }

    renderMessages = () => {
        const messages = this.props.messages.filter((msg) => {
            const msgHasStrangeShape = Object.values(msg).reduce((acc, el) => typeof el === 'object' ? true : acc, false);
            return !msgHasStrangeShape && msg.id;
        }) 
        return messages.map((msg) => <ChatMessage isOutgoing={this.props.userName === msg.name} message={msg} key={msg.id}/>)
    }

    render() {
        return(
            <div className="ChatSpace">
            <div className="ChatSpace-messages" ref={(container) => {this.container = container}}>{this.renderMessages()}</div>
            </div>
        )}
    }

export default ChatSpace;