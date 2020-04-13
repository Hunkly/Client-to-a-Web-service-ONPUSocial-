import React from 'react';
import StyledSubscriber from './Subscriber.styled';
import DefaultPhoto from '../../../assets/img/DefaultPhoto.png';
import UserModel from '../../models/User';

interface IUserSubscribers {
    user: UserModel;
    photo?: string;
}

export default function Subscriber({user, photo}: IUserSubscribers){

        return (
            <StyledSubscriber>
                <a href={`/users/${user.username}`}>
                    <div className="colleague-item__avatar">
                        <img src={DefaultPhoto} alt=""/>
                    </div>
                    <div className="colleague-item__label">{user.first_name} {user.last_name}</div>
                </a>
            </StyledSubscriber>
        );
}
