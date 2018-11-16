import axios from 'axios';
import cookies from 'js-cookie';

const apiDomain = 'http://localhost:3001'

async function login(userData) {
    try {
    let token = await axios.post(apiDomain + '/login', userData);
    console.log(token);
    cookies.set('jwt', token.data);
    authenticate();
    } catch(err) {
        console.error(err.response.data)
    }
}

async function authenticate() {
    console.log(cookies.get('jwt'));
}

export {login, authenticate}