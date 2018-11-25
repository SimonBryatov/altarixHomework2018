
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const LOG_OUT = 'LOG_OUT';

export function sendMessage(id, text) {
    return {
        type: SEND_MESSAGE,
        id,
        text
    }
}


export function logOut() {
    return {
        type: LOG_OUT,
    }
}