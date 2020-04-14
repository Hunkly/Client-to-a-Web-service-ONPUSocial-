import React from 'react';
import StyledSubscribers from './Subscriptions.styled';
import Subscriber from "../Subscriber";
import PageLabel from "../PageLabel";
import UserModel from '../../../shared/models/User';

interface IProps {
    subscriptions: UserModel[];
}

export default function SubscriptionsComponent({subscriptions}: IProps) {

    return (
       <StyledSubscribers>
           <PageLabel>Подписки</PageLabel>
           <div className="friends__container">
               {subscriptions.map((data) => (
               <Subscriber user={data} key={data.id}/>
           ))}
           </div>
       </StyledSubscribers>)};
