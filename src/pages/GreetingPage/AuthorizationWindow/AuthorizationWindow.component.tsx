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
        saveState({isLogged, fullName:{firstName, lastName}});
        console.log('AuthWindow ', {isLogged, fullName});
    }

    return(
        <StyledAuthorizationWindow>
            <div className="authorization-page__container">
                Name
                <input type="text" value={firstName} onChange={logInInput}/>
            </div>
            <div className="authorization-page__container">
                Password
                <input type="text" value={lastName} onChange={signUpInput}/>
            </div>
            <div className="authorization-page__button-container">
                <a href=' ' onClick={auth}>
                    <Button color="#3E76BB" activeColor="#3E76BB">
                        Log in
                    </Button>
                </a>
                or
                <Button color="#FB4141" activeColor="#FB4141">
                    Sign up
                </Button>
            </div>
        </StyledAuthorizationWindow>
    )
}

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