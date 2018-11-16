import { observable, action, decorate } from 'mobx';
import cookies from 'js-cookie';
import axios from 'axios';
import ViewStore from './ViewStore';

const apiDomain = 'http://localhost:3001'

class ApiStore {
    constructor() {
        this.authCheck();
    }

    async login(userData) {
        try {
        let response = await axios.post(apiDomain + '/login', userData);
        let data = JSON.parse(response.data); 
        cookies.set('jwt', data.token);
        } catch(err) {
            console.error(err.response.data)
        }
    }

    async authCheck() {
        try {
            let response = await axios.get(apiDomain + '/authCheck', {withCredentials: true});
            ViewStore.setField('userData', JSON.parse(response.data).userData);
            ViewStore.setField('authDialogState', false);
            this.getUserToDoEntries();
        } catch(err) {
            console.error(err.response)
        }
    }
    
    async getUserToDoEntries() {
       try {
        let response = await axios.get(apiDomain + '/getUserToDoEntries', {withCredentials: true});
        ViewStore.userTodos = JSON.parse(response.data);
       } catch(err) {
        console.error(err.response)
       }
    }


}

decorate(ApiStore, {
    login: action,
    getUserToDoEntries: action
})

export default new ApiStore();