import {SEND_MESSAGE, LOG_OUT} from './actions';

export default function reducer(state, action) {
    switch (action.type) {
        case SEND_MESSAGE:
            return {...state, messages: [...state.messages, {id: action.id, userName: state.userName, text: action.text, isOutgoing: true}]}
        case LOG_OUT:
            return {...state, userName: ''}    
        default:
            return state;
    }
}
