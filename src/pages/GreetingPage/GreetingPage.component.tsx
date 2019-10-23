import React, { useEffect } from 'react';
import GreetingPageStyled from './GreetingPage.styled';
import {CurrentSession, UserName} from "../../store/actionTypes";
import {connect} from "react-redux";
import {saveState} from "../../store/localStorage";
import AuthorizationWindow from "./AuthorizationWindow";

interface IGreetingPageProps{
    isLogged: boolean,
    fullName: UserName
}
let list: CurrentSession = JSON.parse(localStorage.getItem('state') || '{}');
saveState(list);

function GreetingPage({isLogged, fullName}: IGreetingPageProps){

    useEffect(
        () => {
            list = JSON.parse(localStorage.getItem('state') || '{}');
            saveState(list);
            console.log('List', list);
        }
    );

    return(
        <GreetingPageStyled active_color='red'>
            <div className="greeting-page__container">
                { list.isLogged ? null : <div className = "greeting-page__title">WELCOME TO ONPU SOCIAL NETWORK </div>}
                { list.isLogged ? <div className = "greeting-page__text"> We glad to see you here, {list.fullName.firstName}. Let's begin.</div> : <div className = "greeting-page__text">Please, log in or sign up in the system</div>}
                { list.isLogged ? null : <div className= "greeting-page__container">
                </div>}
            </div>
            { list.isLogged ? <div className="greeting-page__container"> PUSTOTAAAAAAAAAAAA </div> : <div className="greeting-page__container">
                <AuthorizationWindow/>
            </div>}
        </GreetingPageStyled>
    )
};

function mapStateToProps(state: CurrentSession){
    console.log('Session', state);
    return {
        isLogged: state.isLogged,
        fullName: {
            firstName: state.fullName.firstName,
            lastName: state.fullName.lastName
        }
    }
}

export default connect(mapStateToProps)(GreetingPage)