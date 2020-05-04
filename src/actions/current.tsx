import { ThunkDispatch as Dispatch } from "redux-thunk";
import axios from "axios";
import * as constants from "../constants";

export interface ICurrent {
  isAuthenticated: boolean | null;
  uuid: string | null;
}

export interface IAuthenticate {
  type: constants.AUTHENTICATE;
  username: string;
}

export function authenticate(username: string): IAuthenticate {
  const serializedState = JSON.stringify({"authenticated": true, "login": username});
  localStorage.setItem('state', serializedState);
  console.log('Авторизация успешна', username);
  return {
    type: constants.AUTHENTICATE,
    username: username
  };
}

export interface IUnauthenticate {
  type: constants.UNAUTHENTICATE;
}

export interface LocalStorage {
  authenticated: boolean | null;
  login: string;
}

function unauthenticate(): IUnauthenticate {
  const serializedState = JSON.stringify({"authenticated": false, "login": ''});
  localStorage.setItem('state', serializedState);
  return {
    type: constants.UNAUTHENTICATE,
  };
}

export type AuthenticationAction = IAuthenticate | IUnauthenticate;

export function logIn(username: string) {
  console.log('Метод логина проверка', username);
  // const serializedState = JSON.stringify({"authenticated": true, "login": username});
  // localStorage.setItem('state', serializedState);
  return (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
    dispatch(authenticate(username));
  };
}

export function logOut() {
  console.log('Метод логаута проверка');
  // const serializedState = JSON.stringify({"authenticated": false, "login": ''});
  // localStorage.setItem('state', serializedState);
  return (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
    dispatch(unauthenticate());
  };
}

export function checkAuthentication() {
  return async (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
    const auth: LocalStorage = await JSON.parse(window.localStorage.getItem("state") || '{}');
    console.log('Проверка авторизации: переменная из локалстор: ', auth.authenticated);
    await axios({
      method: 'get',
      url: `http://localhost:9005/authuser`,
      withCredentials: true,
      headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": 'http://localhost:3000',
      'Accept': 'application/json',
      'Content-Type': 'x-www-form-urlencoded',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
    })
    .then(res => {
      console.log('Проверка на авторизацию: ', res.data);
      dispatch(authenticate(res.data.username));
      return true;
    })
    .catch(error => {
      console.log(error);
      dispatch(unauthenticate());
      return false;
    });
  };
  }
