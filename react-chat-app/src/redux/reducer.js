import {INPUT_VALUE_CHANGE, LOG_OUT, LOG_IN, UPDATE_MESSAGE_POOL} from './actions';

export default function reducer(state, action) {
    switch (action.type) {
        case INPUT_VALUE_CHANGE:
            return {...state, inputValue: action.value}
        case LOG_OUT:
            return {...state, userName: ''}
        case LOG_IN:
            return {...state, inputValue: '', userName: action.userName}      
        case UPDATE_MESSAGE_POOL:
            return {...state, messages: action.messages}    
        default:
            return state;
    }
}
