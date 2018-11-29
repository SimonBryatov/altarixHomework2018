import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';

//let messages = [{id: '131232', userName: 'Алексаднр Анонимович', text: 'Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!', isOutgoing: false}, {id: '131432', userName: 'Я', text: 'Hello!', isOutgoing: true}, {id: '136232', userName: 'Федор Анон', text: 'Hello! Bla bla bla bla bla \n bal bal balsdks jdfkdj fkldj fkldjf!', isOutgoing: false}]

// messages = [...messages, ...messages];
// messages = [...messages, ...messages];
// messages = [...messages, ...messages];
// messages = [...messages, ...messages];


const initialState = {
    messages: [],
    userName: 'Семён Брятов'
}

const logger = store => next => action => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
  }

const store = createStore(reducer, initialState, applyMiddleware(logger));

export default store;