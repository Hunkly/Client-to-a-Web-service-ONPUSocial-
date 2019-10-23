import {CurrentSession, LOG_IN, LOG_OUT, SessionAction, UserName} from "../actionTypes";
import {saveState} from "../localStorage";

export function logIn(session: CurrentSession): SessionAction{
    console.log('Log In action', session);
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
    console.log('Log Out action');
    return {
        type: LOG_OUT,
        isLogged: false,
        fullName: undefined
    }
}