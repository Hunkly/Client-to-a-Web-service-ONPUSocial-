import React, {useEffect, useState} from 'react';
import GreetingPageStyled from './GreetingPage.styled';
import {Account, CurrentSession} from "../../store/currentSession/actionTypes";
import {connect} from "react-redux";
import {saveState} from "../../store/localStorage";
import AuthorizationWindow from "./AuthorizationWindow";

interface IGreetingPageProps{
    isLogged: boolean,
    account: Account,
}
let list: CurrentSession = JSON.parse(localStorage.getItem('state') || '{}');
console.log(list);
saveState(list);

function GreetingPage({isLogged, account}: IGreetingPageProps){
    const [login, setLogin] = useState(list.account.login);
    const [password, setPassword] = useState(list.account.password);
    const [logged, setLogged] = useState(list.isLogged);
    let one = true;

    useEffect(
        () => {
            list = JSON.parse(localStorage.getItem('state') || '{}');
            saveState(list);
            console.log('Greeting page -> localStorage: ', list);
            if(one) {
                setLogin(list.account.login);
                setPassword(list.account.password);
                setLogged(list.isLogged);
            }
        }
    );

    return(
        <GreetingPageStyled active_color='red'>
            <div className="greeting-page__container">
                { logged ? null : <div className = "greeting-page__title">WELCOME TO ONPU SOCIAL NETWORK </div>}
                { logged ? <div className = "greeting-page__text"> We glad to see you here, {login}. Let's begin.</div> : <div className = "greeting-page__text">Please, log in or sign up in the system</div>}
            </div>
            { logged ? null : <div className="greeting-page__container">
                <AuthorizationWindow/>
            </div>}
        </GreetingPageStyled>
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

export default connect(mapStateToProps)(GreetingPage)