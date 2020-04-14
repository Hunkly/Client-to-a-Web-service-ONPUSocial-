import React, {useEffect, useState} from 'react'
import SubscriptionsComponent from './Subscriptions.component';
import UserModel from '../../../shared/models/User';
import axios from "axios";

interface IProps {
  user: UserModel
}

export default function SubscriptionsContainer({user}: IProps){
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:9005/users/${user.username}/subscriptions`,
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": 'http://localhost:3000',
        'Accept': 'application/json',
        'Content-Type': 'x-www-form-urlencoded',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }
    }).then( res => {
      console.log('Subscriptions list: ', res.data);
      setSubscriptions(res.data);
    })
        .catch( err => {
          return err
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return(
      <div>
        <SubscriptionsComponent subscriptions={subscriptions}/>
      </div>
  )
}
