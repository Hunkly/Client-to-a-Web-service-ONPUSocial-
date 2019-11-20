import { createStore, applyMiddleware } from 'redux';
import currentSessionReducer, {initialState} from './currentSession/reducers';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const store = createStore(currentSessionReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
