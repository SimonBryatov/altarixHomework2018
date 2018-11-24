import React from 'react';
import ChatMessage from '../ChatMessage/ChatMessage';
import './ChatSpace.css';

class ChatSpace extends React.Component { 

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate({messages}) {
        //if (messages[messages.length - 1].isOutgoing) {
        this.scrollToBottom();
        //}
    }

    scrollToBottom() {
        this.container.scrollTop = this.container.scrollHeight;
    }

    renderMessages = () => {
        return this.props.messages.map((msg) => <ChatMessage className="" message={msg} key={msg.id}/>)
    }

    render() {
        return(
            <div className="ChatSpace">
            <div className="ChatSpace-messages" ref={(container) => {this.container = container}}>{this.renderMessages()}</div>
            </div>
        )}
    }

export default ChatSpace;