import {CurrentSession, LOG_IN, LOG_OUT, SessionAction} from "../actionTypes";

const initialState: CurrentSession = {
    isLogged: false,
    fullName: {
        firstName: '',
        lastName: ''
    }
};

export default function currentSessionReducer(state = initialState, action: SessionAction ): CurrentSession {
    switch(action.type) {
        case LOG_IN:
            console.log('LOG_IN reducer', state);
            return {
                isLogged: action.isLogged,
                fullName: {
                    firstName: action.fullName.firstName,
                    lastName: action.fullName.lastName
                }
            };
        case LOG_OUT:
            console.log('LOG_OUT reducer', state);
            return initialState;

        default:
            return state
    }
}