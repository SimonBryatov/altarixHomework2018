import React from 'react';
import {connect} from 'react-redux';
import Footer from '../components/Footer/Footer'
import { sendMessage } from '../redux/actions';

class FooterContainer extends React.Component {
    render() {
        return <Footer messages={this.props.messages} onSend={this.props.handleSendMessage} />
    }
}

const mapDispatchToProps = (dispatch) => ({
    handleSendMessage(text) {
        dispatch(sendMessage(Date.now(), text))
    }
})

export default connect(null, mapDispatchToProps)(FooterContainer)