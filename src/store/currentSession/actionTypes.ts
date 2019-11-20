export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export interface Account {
    login: string,
    password: string
}

export interface CurrentSession{
    isLogged: boolean,
    account: Account
}

 interface LogIn {
    type: typeof LOG_IN
    payload: CurrentSession
}

 interface LogOut{
    type: typeof LOG_OUT
    isLogged: boolean,
    account: undefined
}

export type SessionAction = LogOut | LogIn;