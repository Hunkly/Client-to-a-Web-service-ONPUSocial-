import React, {useEffect, useState} from 'react';
import Button from "../Button/Button.component";
import StyledProfileMenu from './ProfileMenu.styled';
import DefaultPhoto from '../../../assets/img/DefaultPhoto.png';
import axios from "axios";
import UserModel from '../../../shared/models/User';

interface IProps {
    user: UserModel;
    viewMode: 'own' | 'notOwn'
}

export default function ProfileMenu({user, viewMode}:IProps) {
    const [subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:9005/authuser/subscriptions/${user.username}`,
            withCredentials: true,
            headers: {
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": 'http://localhost:3000',
                'Accept': 'application/json',
                'Content-Type': 'x-www-form-urlencoded',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        }).then( res => {
            console.log('Check subscribe: ', res.data);
            if(res.data) setSubscribed(true); else setSubscribed(false);
        })
            .catch( err => {
                console.log('Check subscribe error: ', err);
            })
    },[subscribed]);

    function subscribe(){
        axios({
            method: 'post',
            url: `http://localhost:9005/authuser/subscriptions/${user.username}`,
            withCredentials: true,
            headers: {
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": 'http://localhost:3000',
                'Accept': 'application/json',
                'Content-Type': 'x-www-form-urlencoded',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        }).then( res => {
            console.log('Subscribe to user: ',res);
            setSubscribed(!subscribed);
        })
            .catch( err => {
                console.log('Subscribe error: ', err);
            })
    }

    return (
        <StyledProfileMenu>
            <div className="profile-menu__avatar">
                <img src={DefaultPhoto} alt=""/>
            </div>
            <div>
                {
                    viewMode === 'own' ?
                        <Button color="#61BB9D" activeColor="#4F977F">
                            Редактировать профиль
                        </Button> :
                        !subscribed ?
                <Button color="#61BB9D" activeColor="#4F977F" onClick={subscribe}>
                    Подписаться
                </Button> :
                <Button color="#61BB9D" activeColor="#4F977F" onClick={subscribe}>
                    Отписаться
                </Button>
                }
            </div>
        </StyledProfileMenu>
    )};
