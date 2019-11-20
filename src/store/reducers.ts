import {combineReducers} from "redux";
import CurrentSession from './currentSession/reducers';
import {LOG_OUT, SessionAction} from "./currentSession/actionTypes";
import {loadState} from "./localStorage";
import dataReducer from './data/reducer';
import errorReducer from './errorHandler/reducer';

const persistedState = loadState();

export const allReducers = combineReducers({
    CurrentSession,
    persistedState,
    dataReducer,
    errorReducer
});

const rootReducer = (state: any, action: SessionAction) => {
    if(action.type === LOG_OUT){
        state = undefined
    }
    return allReducers(state,action);
};

export type AppState = ReturnType<typeof rootReducer>