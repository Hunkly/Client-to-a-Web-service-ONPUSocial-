export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const SHOW_REG_WINDOW = 'SHOW_REG_WINDOW';

export interface Account {
    login: string,
    password: string
}

export interface CurrentSession{
    isLogged: boolean,
    signUp: boolean
    account: Account
}

 interface LogIn {
    type: typeof LOG_IN
    payload: CurrentSession
}

 interface LogOut{
    type: typeof LOG_OUT
    isLogged: boolean,
    signUp: boolean,
    account: undefined
}

interface ShowReg{
    type: typeof SHOW_REG_WINDOW
    isLogged: boolean,
    signUp: boolean
}

export type SessionAction = LogOut | LogIn | ShowReg;