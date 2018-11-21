import React from 'react';
import ChatMessage from '../ChatMessage/ChatMessage';
import './ChatSpace.css';

let renderMessages = (messages) => {
    return messages.map((msg, ind) => <ChatMessage className="" message={msg} key={ind}/>)
}

const ChatSpace = ({messages}) => (
    <div className="ChatSpace">{renderMessages(messages)}</div>
)

export default ChatSpace;