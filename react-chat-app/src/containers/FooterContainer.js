import React from 'react';
import {connect} from 'react-redux';
import Footer from '../components/Footer/Footer'
import { sendMessage } from '../redux/actions';
import {db} from '../firebase';

class FooterContainer extends React.Component {
    sendMessage = (text) => {
        let now = Date.now();
        let message = {
            id: now, 
            text,
            name: this.props.userName
        }
        db.ref(`/messages/${now}`).set(message);
    }

    render() {
        return <Footer messages={this.props.messages} onSend={this.sendMessage} />
    }
}

const mapDispatchToProps = (dispatch) => ({
    handleSendMessage(text) {
        dispatch(sendMessage(Date.now(), text))
    }
})

export default connect(null, mapDispatchToProps)(FooterContainer)