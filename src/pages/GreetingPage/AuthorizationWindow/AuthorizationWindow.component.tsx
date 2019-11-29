import React, { useState, useEffect } from 'react';
import StyledAuthorizationWindow from './AuthorizationWindow.styled';
import Button from "../../../shared/components/Button";
import { logIn } from "../../../store/currentSession/actions";
import { saveState } from "../../../store/localStorage";
import { CurrentSession, Account } from "../../../store/currentSession/actionTypes";
import { connect } from "react-redux";
import axios from 'axios';
// import { getDataSuccess } from "../../../store/data/actions";
// import * as errorHandlerActions from '../../../store/errorHandler/actions';
import Store from '../../../store/store';

interface IAuthWindowProps{
    isLogged: boolean,
    account: Account,
}

interface DispatchProps {
    onLogIn: (session: CurrentSession) => void,
    onGetData: (url: string, props: any) => void
}

type Props = IAuthWindowProps & DispatchProps;

let list: CurrentSession = JSON.parse(localStorage.getItem('state') || '{}');
console.log(list);
saveState(list);
console.log('Store ', Store.getState());



function AuthorizationWindow ({isLogged, account, onLogIn, onGetData}: Props){
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [valid, setValid] = useState(true);
    const [err, setErr] = useState(false);
    const [errStatus, setErrStatus] = useState('');
    const [errMessage, setErrMessage] = useState('');
    const [id, setId] = useState('');
    const [emailed, setEmailed] = useState(false);

    function Autorization(login: string, password: string){
        axios
            .get(`http://localhost:9005/login?login=${login}&password=${password}`)
            .then(res => {
                console.log('ON GET DATA, getDataSuccess', res);
                onLogIn({
                    isLogged: res.data,
                    account: {
                        login: login,
                        password: password
                    }
                });
                saveState({isLogged: res.data, account: {login, password}});
                setErr(false);
            })
            .catch(error => {
                setErr(true);
                if(error.message === 'Network Error') {
                    setErrStatus(error.status);
                    setErrMessage(error.message);
                } else {
                    console.log('ON GET DATA, error', error.response.data);
                    setErrStatus(error.response.status);
                    setErrMessage(error.response.data.message);
                }
            });
        onGetData(`http://localhost:9005/login?login=${login}&password=${password}`, 'test');
    }

    useEffect(
        () => {
            if(!login && !password){
                setValid(true);
            }
        }
    );

    function logInInput(event: React.ChangeEvent<HTMLInputElement>){
        setLogin(event.target.value);
        onLogIn({
            isLogged: false,
            account:{
                login: event.target.value,
                password: password
            }
        });
        //console.log('Reg exp',validate(event.target.name,event.target.value));
        if(validate(event.target.name,event.target.value)){
            if(!validate('email',event.target.value)){
                setValid(validate(event.target.name,event.target.value));
                setEmailed(false);
            } else {
                setEmailed(true);
            }
        } else {
            setValid(false);
        }
        console.log('LOGIN', login);
        console.log('emailed ', emailed);
        setId(event.target.name);
        setErr(false);
    }

    function passInput(event: React.ChangeEvent<HTMLInputElement>){
        setPassword(event.target.value);
        onLogIn({
            isLogged: false,
            account:{
                login: login,
                password: event.target.value
            }
        });
        // console.log('Reg exp',validate(event.target.name,event.target.value));
        // setValid(validate(event.target.name,event.target.value));
        // setId(event.target.name);
        console.log('PASSWORD', password);
        setErr(false);
    }
    // let log = '';
    function auth(){
        if(validate('login',login)){
            if(!validate('email',login)){
                setValid(validate('login',login));
                setEmailed(false);
            } else {
                setEmailed(true);
            }
        } else {
            setValid(false);
        }
        if(valid) {
            console.log('auth emailed', emailed);
            if(emailed){
                axios
                    .get(`http://localhost:9005/users/getbyemail/${account.login}`)
                    .then(res => {
                        Autorization(res.data.username, account.password);
                        setErr(false);
                    })
                    .catch(error => {
                        setErr(true);
                        if(error.message === 'Network Error') {
                            setErrStatus(error.status);
                            setErrMessage(error.message);
                        } else {
                            console.log('ON GET DATA, error', error.response.data);
                            setErrStatus(error.response.status);
                            setErrMessage(error.response.data.message);
                        }
                    });

            } else {
                setLogin(account.login);
                Autorization(account.login, account.password);
            }
        }
    }

    function validate(name: string, value: string){
        switch(name){
            case 'login': {
                let re = /[A-Za-z]/;
                return re.test(String(value).toLowerCase());
            }
            case 'email': {
                let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(value).toLowerCase());
            }
            // case 'password': {
            //     let re = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
            //     return re.test(String(value).toLowerCase());
            // }
            default: {
                return false;
            }
        }
    }

    return(
        <StyledAuthorizationWindow id={id} isValid={valid} isErr={err}>
            <div className="authorization-page__container">
                Login or email
                <input
                    id="login"
                    name="login"
                    type="text"
                    placeholder="Login or email"
                    value={login}
                    onChange={logInInput}
                />
                {
                    valid || !login ? null :
                        id === 'login' ?
                            <div className="auth-window__additional-text">
                                Login must have only latin letters
                            </div> : null
                }
            </div>
            <div className="authorization-page__container">
                Password
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={passInput}
                />
                {
                    valid || !password ? null :
                        id === 'password' ?
                            <div className="auth-window__additional-text">
                                Password must have only latin letters
                            </div> : null
                }
                {
                    err ? <div className="auth-window__additional-text">
                            Error {errStatus}: {errMessage}
                        </div> : null
                }
            </div>
            <div className="authorization-page__button-container">
                    <Button
                        color="#3E76BB"
                        activeColor="#3E76BB"
                        onClick={auth}
                    >
                        Log in
                    </Button>
                or
                <Button
                    color="#FB4141"
                    activeColor="#FB4141"
                >
                    Sign up
                </Button>
            </div>
        </StyledAuthorizationWindow>
    )
}

function mapStateToProps(state: CurrentSession){
    return {
        isLogged: state.isLogged,
        account: {
            login: state.account.login,
            password: state.account.password
        }
    }
}

function mapDispatchToProps(dispatch: any): DispatchProps{
    return {
        onLogIn: async (session: CurrentSession) => {
            await dispatch(logIn(session));
            //console.log('Login completed [UI]')
        },
        onGetData: async (url: string, props: any) => {
            axios
                .get(url)
                .then(res => {
                    console.log('ON GET DATA, getDataSuccess', res);
                    // dispatch(getDataSuccess(res.data));
                    return res.data;
                })
                .catch(error => {
                    console.log('ON GET DATA, error', error);
                    // dispatch(errorHandlerActions.handleHTTPError(error, props));
                    return error;
                })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationWindow)