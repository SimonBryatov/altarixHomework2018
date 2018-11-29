import React from 'react';
import './ChatMessage.css';
import HideMe from '../HideMe/HideMe';
import classNames from 'classnames';
const ChatMessage = ({message, isOutgoing}) => {
    return (<div className={classNames('ChatMessage',  {'justify-right': isOutgoing})}>
        <div className={classNames("ChatMessage-message-avatar", {'order-2': isOutgoing})}>
            <i className="ChatMessage-message-avatar__icon fas fa-user-circle"></i>
            <HideMe hide={isOutgoing}><div className="ChatMessage-message-avatar__username">{message.name}</div></HideMe>
        </div>
        <div className='ChatMessage-message-text'>{message.text}</div>
    </div>)
}

export default ChatMessage;