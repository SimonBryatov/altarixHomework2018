import { observable, action, decorate } from 'mobx';

class ViewStore {

    authDialogState = true;
    loaderState = false;
    userTodos = {};
    userData = {};

    setField(fieldName, data) {
        this[fieldName] = data;
    }

}

decorate(ViewStore, {
    authDialogState: observable,
    loaderState: observable,
    userTodos: observable,
    userData: observable
})

export default new ViewStore();