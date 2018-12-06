import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';

const initialState = {
    messages: [],
    userName: 'Семён Брятов', 
    inputValue: ''
}

const logger = store => next => action => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
  }

const store = createStore(reducer, initialState, applyMiddleware(logger));

export default store;