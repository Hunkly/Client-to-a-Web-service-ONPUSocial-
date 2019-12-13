import React, {useEffect, useState} from 'react';
import GreetingPageStyled from './GreetingPage.styled';
import {CurrentSession} from "../../store/currentSession/actionTypes";
import {connect} from "react-redux";
import {saveState} from "../../store/localStorage";
import Button from '../../shared/components/Button'
import pathHistory from "../../pathHistory";
import axios from 'axios';
import Cookies from 'js-cookie';

let list: CurrentSession = JSON.parse(localStorage.getItem('state') || '{}');
console.log(list);
saveState(list);

function GreetingPage(){
    const [logged, setLogged] = useState(list.isLogged);
    const [userName, setUserName] = useState('');

    useEffect(
        () => {
            list = JSON.parse(localStorage.getItem('state') || '{}');
            saveState(list);
            console.log(`Greeting page's localStorage: ${list}`);
            if(list.isLogged){
            axios({
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
                    console.log(res.data);
                    setUserName(res.data.username);
                    setLogged(true)
                })
                .catch(error => {
                    console.log(error);
                });
            axios
                .get(`http://localhost:9005/authusers`)
                .then(res => {
                    console.log(res.data);
                })
                .catch(error => {
                    console.log(error);
                });
            }
            setLogged(list.isLogged);
        },[logged]
    );

    function pushToAdress(event: React.ChangeEvent<HTMLButtonElement>){
        return pathHistory.push(event.target.value);
    }

    return(
        <GreetingPageStyled active_color='red'>
            <div className="greeting-page__container">
                <div className = "greeting-page__title">ONPU Social</div>
                { logged ?
                    <div>
                        <div className = "greeting-page__text">
                            We glad to see you here, {userName}. Let's begin.
                        </div>
                        <div className= "greeting-page__button-container">
                            <Button
                                onClick={pushToAdress}
                                value={`/users/${userName}`}
                                color="#3E76BB"
                                activeColor="#3E76BB"
                            >My profile</Button>
                        </div>
                    </div>

                    :
                    <div className= "greeting-page__button-container">
                        <Button
                            onClick={pushToAdress}
                            value="/auth"
                            color="#3E76BB"
                            activeColor="#3E76BB"
                        >Sign in</Button>
                        <Button
                            onClick={pushToAdress}
                            value="/signup"
                            color="#FB4141"
                            activeColor="#FB4141"
                        >Sign Up</Button>
                    </div>
                }
            </div>
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