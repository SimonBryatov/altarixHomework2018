export const INPUT_VALUE_CHANGE = 'INPUT_VALUE_CHANGE';
export const LOG_OUT = 'LOG_OUT';
export const LOG_IN = 'LOG_IN';
export const UPDATE_MESSAGE_POOL = 'UPDATE_MESSAGE_POOL';


export function inputValueChange(value) {
    return {
        type: INPUT_VALUE_CHANGE,
        value
    }
}

export function updateMessagePool(messages) {
    return {
        type: UPDATE_MESSAGE_POOL,
        messages
    }
}

export function logIn(userName) {
    return {
        type: LOG_IN,
        userName
    }
}

export function logOut() {
    return {
        type: LOG_OUT,
    }
}