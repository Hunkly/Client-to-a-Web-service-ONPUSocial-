import React, {useEffect, useState} from 'react'
import SubscribersComponent from './Subscribers.component';
import UserModel from '../../../shared/models/User';
import axios from "axios";

interface IProps {
  user: UserModel
}

export default function SubscribersContainer({user}: IProps){
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:9005/users/${user.username}/subscribers`,
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": 'http://localhost:3000',
        'Accept': 'application/json',
        'Content-Type': 'x-www-form-urlencoded',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }
    }).then( res => {
      console.log('Subsribers list: ', res.data);
      setSubscribers(res.data);
    })
        .catch( err => {
          console.log('Subsribers list error: ', err);
        })
  },[])
  return(
      <div>
        <SubscribersComponent  subscribers={subscribers}/>
      </div>
  )
}
