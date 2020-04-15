import React from 'react';
import StyledSubscribers from './Subscribers.styled';
import Subscriber from "../Subscriber";
import PageLabel from "../PageLabel";
import UserModel from '../../../shared/models/User';

interface IProps {
    subscribers: UserModel[];
}

export default function SubscribersComponent({subscribers}: IProps) {

    return (
       <StyledSubscribers>
           <PageLabel>Подписчики</PageLabel>
           <div className="friends__container">
               {
                   subscribers.length === 0 ?  <p>Пока что пусто.</p> : null
               }
               {
                   subscribers.map((data) => (
               <Subscriber user={data} key={data.id}/>
           ))}
           </div>
       </StyledSubscribers>)};
