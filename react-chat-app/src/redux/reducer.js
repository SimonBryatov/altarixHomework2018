import {SEND_MESSAGE, LOG_OUT, LOG_IN, UPDATE_MESSAGE_POOL} from './actions';

export default function reducer(state, action) {
    switch (action.type) {
        case SEND_MESSAGE:
            return {...state, messages: [...state.messages, {id: action.id, userName: state.userName, text: action.text, isOutgoing: true}]}
        case LOG_OUT:
            return {...state, userName: ''}
        case LOG_IN:
            return {...state, userName: action.userName}      
        case UPDATE_MESSAGE_POOL:
            return {...state, messages: action.messages}    
        default:
            return state;
    }
}
