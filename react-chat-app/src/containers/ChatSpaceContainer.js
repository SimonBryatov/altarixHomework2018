import React from 'react';
import {connect} from 'react-redux';
import ChatSpace from '../components/ChatSpace/ChatSpace'

const ChatSpaceContainer = ({messages}) => (
    <ChatSpace messages={messages}/>
);

const mapStateToProps = (state) => (
    {messages: state.messages}
)

export default connect(mapStateToProps)(ChatSpaceContainer)