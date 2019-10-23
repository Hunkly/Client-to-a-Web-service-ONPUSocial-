export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export interface UserName {
    firstName: string,
    lastName: string
}

export interface CurrentSession{
    isLogged: boolean,
    fullName: UserName
}

 interface LogIn {
    type: typeof LOG_IN
    isLogged: boolean,
    fullName: UserName
}

 interface LogOut{
    type: typeof LOG_OUT
    isLogged: boolean,
    fullName: undefined
}

export type SessionAction = LogOut | LogIn;