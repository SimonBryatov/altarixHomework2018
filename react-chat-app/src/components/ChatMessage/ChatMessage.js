import React from 'react';
import './ChatMessage.css';
import HideMe from '../HideMe/HideMe';
import classNames from 'classnames';
const ChatMessage = ({message}) => {
    return (<div className={classNames('ChatMessage',  {'align-right': message.isMine})}>
        <div className={classNames("ChatMessage-message-avatar", {'order-2': message.isMine})}>
            <i class="ChatMessage-message-avatar__icon fas fa-user-circle"></i>
            <HideMe hide={message.isMine}><div class="ChatMessage-message-avatar__username">{message.from}</div></HideMe>
        </div>
        <div className='ChatMessage-message-text'>{message.text}</div>
    </div>)
}

export default ChatMessage;