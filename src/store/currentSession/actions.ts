import {CurrentSession, LOG_IN, LOG_OUT, SessionAction } from "./actionTypes";
import {saveState} from "../localStorage";

export function logIn(session: CurrentSession): SessionAction{
    console.log('LOG_IN action', session);
    saveState({
        isLogged: session.isLogged,
        account: {
            login: session.account.login,
            password: session.account.password
        }
    });
    return{
        type: LOG_IN,
        payload: session
    }
}

export function logOut(): SessionAction{
    saveState({
        isLogged: false,
        account: {
            login: '',
            password: ''
        }
    });
    console.log('LOG_OUT action');
    return {
        type: LOG_OUT,
        isLogged: false,
        account: undefined
    }
}