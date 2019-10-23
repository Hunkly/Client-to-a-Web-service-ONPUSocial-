import React, {useState} from 'react';
import StyledAuthorizationWindow from './AuthorizationWindow.styled';
import Button from "../../../shared/components/Button";
import Store from "../../../store/store";
import {logIn} from "../../../store/currentSession/actions";
import {saveState} from "../../../store/localStorage";
import {CurrentSession, UserName} from "../../../store/actionTypes";
import {connect} from "react-redux";

interface IAuthWindowProps{
    isLogged: boolean,
    fullName: UserName
}

function AuthorizationWindow ({isLogged, fullName}: IAuthWindowProps){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    function logInInput(event: React.ChangeEvent<HTMLInputElement>){
        setFirstName(event.target.value)
    }
    function signUpInput(event: React.ChangeEvent<HTMLInputElement>){
        setLastName(event.target.value);
    }

    function auth(){
        Store.dispatch( logIn( {
            isLogged: true,
            fullName:{
                firstName: firstName,
                lastName: lastName
            }
        }));
        saveState({isLogged, fullName});
        console.log('Props! ', fullName);
    }

    return(
        <StyledAuthorizationWindow>
            <div className="authorization-page__container">
                Name
                <input type="text" onChange={logInInput}/>
            </div>
            <div className="authorization-page__container">
                Password
                <input type="text" onChange={signUpInput}/>
            </div>
            <div className="authorization-page__button-container">
                <a onClick={auth}>
                <Button color="#9BA8B8" activeColor="#3E76BB">
                    Log in
                </Button>
                </a>
                <Button color="#7DB27E" activeColor="#35AA38">
                    Sign up
                </Button>
            </div>
        </StyledAuthorizationWindow>
    )
};

function mapStateToProps(state: CurrentSession){
    return {
        isLogged: state.isLogged,
        fullName: {
            firstName: state.fullName.firstName,
            lastName: state.fullName.lastName
        }
    }
}

export default connect(mapStateToProps)(AuthorizationWindow)