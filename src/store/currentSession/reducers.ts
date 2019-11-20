import {CurrentSession, LOG_IN, LOG_OUT, SessionAction} from "./actionTypes";

export const initialState: CurrentSession = {
    isLogged: false,
    account: {
        login: '',
        password: ''
    }

};

export default function currentSessionReducer(state = initialState, action: SessionAction ): CurrentSession {
    switch(action.type) {
        case LOG_IN:
            console.log('LOG_IN reducer', state);
            return {
                ...state,
                account:{
                  login: action.payload.account.login,
                  password: action.payload.account.password
                },
                isLogged: action.payload.isLogged
            };
        case LOG_OUT:
            console.log('LOG_OUT reducer', state);
            return initialState;
        default:
            return state
    }
}