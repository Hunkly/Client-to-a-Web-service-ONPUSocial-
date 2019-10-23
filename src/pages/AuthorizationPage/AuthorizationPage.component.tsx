import React, { useState } from 'react';
import StyledAuthorizationPage from './AuthorizationPage.styled';
import Store from '../../store/store';
import { logIn } from '../../store/currentSession/actions';
import { connect } from 'react-redux';
import {CurrentSession, UserName} from '../../store/actionTypes';
import {saveState} from "../../store/localStorage";

interface IAuthProps{
    isLogged: boolean,
    fullName: UserName
}

function AuthorizationPage ({isLogged, fullName}: IAuthProps){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    function changeText1(event: React.ChangeEvent<HTMLInputElement>){
        setFirstName(event.target.value)
    }
    function changeText2(event: React.ChangeEvent<HTMLInputElement>){
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

    return (
        <StyledAuthorizationPage>
            <div>{fullName.firstName}</div>
            Authorization
            <input type="text" value={firstName} onChange={changeText1}/>
            <input type="text" value={lastName} onChange={changeText2}/>
            {/*<a href="/" onClick={auth}>auth</a>*/}
            <button onClick={auth}>auth</button>
            <p>First name: {firstName}</p>
            <p>Last name: {lastName}</p>
        </StyledAuthorizationPage>
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

// const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
//     remove: (item) => () => dispatch({ type: "REMOVE_ITEM", item }),
// });

export default connect(mapStateToProps)(AuthorizationPage)