import { createStore } from 'redux';
import CurrentSession from './currentSession/reducers';

const store = createStore(CurrentSession);

export default store;
