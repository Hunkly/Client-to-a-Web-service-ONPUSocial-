import {combineReducers} from "redux";
import CurrentSession from './currentSession/reducers';
import {LOG_OUT, SessionAction} from "./actionTypes";
import {loadState} from "./localStorage";

const persistedState = loadState();

export const allReducers = combineReducers({
    CurrentSession,
    persistedState
});

const rootReducer = (state: any, action: SessionAction) => {
    if(action.type === LOG_OUT){
        state = undefined
    }
    return allReducers(state,action);
};

export type AppState = ReturnType<typeof rootReducer>