import React, { useState, useEffect } from 'react';
import StyledAuthorizationWindow from './AuthorizationWindow.styled';
import Button from "../Button";
import axios from 'axios';
import pathHistory from "../../../pathHistory";
import {
    logIn,
    ICurrent,
    checkAuthentication,
    IAuthenticate,
    AuthenticationAction,
    authenticate
} from "../../../actions/current";
import {connect} from "react-redux";
import { ThunkDispatch as Dispatch } from "redux-thunk";

console.log('Компонент Окна авторизации');

interface IProps {
    isAuthenticated: boolean | null;
}

interface DispatchProps {
    onLogIn: (username: string) => void;
}

type Props = IProps & DispatchProps;

function AuthorizationWindow ({ onLogIn, isAuthenticated}: Props){
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [valid, setValid] = useState(true);
    const [err, setErr] = useState(false);
    const [errStatus, setErrStatus] = useState('');
    const [errMessage, setErrMessage] = useState('');
    const [id, setId] = useState('');
    const [emailed, setEmailed] = useState(false);


    function Authorization(login: string, password: string){
        const authForm = {
            login: login,
            pass: password
        };
        axios({
            method: 'post',
            url: `http://localhost:9005/login`,
            data: authForm,
            withCredentials: true,
            headers: {
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": 'http://localhost:3000',
                'Accept': 'application/json',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        })
            .then(res => {
                console.log('Авторизация прошла успешно: ', res);
                setErr(false);
                onLogIn(login);
                pathHistory.push(`/users/${login}`);
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
            })
    }

    useEffect(
        () => {
            if(!login && !password){
                setValid(true);
            }
        },[login,password]
    );

    function logInInput(event: React.ChangeEvent<HTMLInputElement>){
        setLogin(event.target.value);
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
        console.log('PASSWORD', password);
        setErr(false);
    }

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
                axios({
                    method: 'get',
                    url: `http://localhost:9005/users/getbyemail/${login}`,
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
                        Authorization(res.data.username, password);
                        setErr(false);
                    })
                    .catch(error => {
                        setErr(true);
                    });
            }
            else {
                setLogin(login);
                Authorization(login, password);
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
                <Button
                    color="#FB4141"
                    activeColor="#FB4141"
                    onClick={() => {pathHistory.push('/')}}
                    value="/"
                >
                    Go back
                </Button>
            </div>
        </StyledAuthorizationWindow>
    )
}

const mapStateToProps = (state: ICurrent) => ({
    isAuthenticated: state.isAuthenticated
});

function mapDispatchToProps(dispatch: Dispatch<IAuthenticate, {}, any>): DispatchProps{
    return {
        onLogIn: (username: string) => {
            dispatch(authenticate(username));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AuthorizationWindow);
