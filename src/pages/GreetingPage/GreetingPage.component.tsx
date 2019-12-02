import React, {useEffect, useState} from 'react';
import GreetingPageStyled from './GreetingPage.styled';
import {CurrentSession} from "../../store/currentSession/actionTypes";
import {connect} from "react-redux";
import {saveState} from "../../store/localStorage";
import Button from '../../shared/components/Button'
import pathHistory from "../../pathHistory";
import AuthorizationWindow from "./AuthorizationWindow";
import RegistrationWindow from "./RegistrationWindow";

// interface IGreetingPageProps{
//     isLogged: boolean,
//     account: Account,
// }
let list: CurrentSession = JSON.parse(localStorage.getItem('state') || '{}');
console.log(list);
saveState(list);
// saveState({isLogged: false, account: { login: '', password: ''}});

function GreetingPage(){
    // const [login, setLogin] = useState(list.account.login);
    // // const [password, setPassword] = useState(list.account.password);
    const [logged, setLogged] = useState(list.isLogged);
    // const [signUp, setSignUp] = useState(list.signUp);
    let one = true;

    useEffect(
        () => {
            list = JSON.parse(localStorage.getItem('state') || '{}');
            saveState(list);
            console.log('Greeting page -> localStorage: ', list);
            if(one) {
                // setLogin(list.account.login);
                // setSignUp(list.signUp);
                // setPassword(list.account.password);
                setLogged(list.isLogged);
            }
        }
    );

    function pushTo(event: React.ChangeEvent<HTMLButtonElement>){
        return pathHistory.push(event.target.value);
    }

    return(
        <GreetingPageStyled active_color='red'>
            <div className="greeting-page__container">
                {/*{ logged ? null : <div className = "greeting-page__title">WELCOME TO ONPU SOCIAL NETWORK </div>}*/}
                {/*{ logged ? <div className = "greeting-page__text"> We glad to see you here, {login}. Let's begin.</div> : <div className = "greeting-page__text">Please, log in or sign up in the system</div>}*/}
                <div className = "greeting-page__title">ONPU Social</div>
                { logged ?
                    <div>
                        <div className = "greeting-page__text">
                            We glad to see you here, {list.account.login}. Let's begin.
                        </div>
                        <div className= "greeting-page__button-container">
                            <Button
                                onClick={pushTo}
                                value={`/users/${list.account.login}`}
                                color="#3E76BB"
                                activeColor="#3E76BB"
                            >My profile</Button>
                        </div>
                    </div>

                    :
                    <div className= "greeting-page__button-container">
                        <Button
                            onClick={pushTo}
                            value="/auth"
                            color="#3E76BB"
                            activeColor="#3E76BB"
                        >Sign in</Button>
                        <Button
                            onClick={pushTo}
                            value="/signup"
                            color="#FB4141"
                            activeColor="#FB4141"
                        >Sign Up</Button>
                    </div>
                }
            </div>
            {/*{ logged ? null : signUp ? <div className="greeting-page__container">*/}
            {/*    <RegistrationWindow/>*/}
            {/*</div> : <div className="greeting-page__container">*/}
            {/*    <AuthorizationWindow/>*/}
            {/*</div>}*/}
        </GreetingPageStyled>
    )
}

function mapStateToProps(state: CurrentSession){
    return {
        isLogged: state.isLogged,
        signUp: state.signUp,
        account: {
            login: state.account.login,
            password: state.account.password
        }
    }
}

export default connect(mapStateToProps)(GreetingPage)