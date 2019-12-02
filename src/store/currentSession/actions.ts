import {CurrentSession, LOG_IN, LOG_OUT, SessionAction, SHOW_REG_WINDOW} from "./actionTypes";
import {saveState} from "../localStorage";

export function logIn(session: CurrentSession): SessionAction{
    console.log('LOG_IN action', session);
    saveState({
        isLogged: session.isLogged,
        signUp: false,
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
        signUp: false,
        account: {
            login: '',
            password: ''
        }
    });
    console.log('LOG_OUT action');
    return {
        type: LOG_OUT,
        isLogged: false,
        signUp: false,
        account: undefined
    }
}

export function showRegWindow(){
    console.log('SHOW_REG_WINDOW action');
    saveState({
        isLogged: false,
        signUp: true,
        account: {
            login: '',
            password: ''
        }});
    return{
        type: SHOW_REG_WINDOW,
        isLogged: false,
        signUp: true,
        account: undefined
    }
}