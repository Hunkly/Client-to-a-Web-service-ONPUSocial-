import {CurrentSession, LOG_IN, LOG_OUT, SessionAction } from "../actionTypes";
import {saveState} from "../localStorage";

export function logIn(session: CurrentSession): SessionAction{
    console.log('LOG_IN action', session);
    saveState({
        isLogged: session.isLogged,
        fullName: {
            firstName: session.fullName.firstName,
            lastName: session.fullName.lastName
        }
    });
    return {
        type: LOG_IN,
        isLogged: session.isLogged,
        fullName: {
            firstName: session.fullName.firstName,
            lastName: session.fullName.lastName
        }
    }
}

export function logOut(): SessionAction{
    saveState({
        isLogged: false,
        fullName: {
            firstName: '',
            lastName: ''
        }
    });
    console.log('LOG_OUT action');
    return {
        type: LOG_OUT,
        isLogged: false,
        fullName: undefined
    }
}