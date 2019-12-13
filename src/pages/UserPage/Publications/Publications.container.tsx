import React, {useState, useEffect} from 'react';
import UserPost from '../../../shared/models/Post';
import axios from 'axios';
import {CurrentSession} from "../../../store/currentSession/actionTypes";
import {saveState} from "../../../store/localStorage";
import Store from "../../../store/store";
import Publications from "./Publications.component";
import UserModel from '../../../shared/models/User';

interface IPublicationsContainerState {
    //isLoading: boolean;
    posts?: UserPost[];
    user: UserModel,
}

let list: CurrentSession = JSON.parse(localStorage.getItem('state') || '{}');
console.log(list);
saveState(list);
console.log('Store ', Store.getState());

export default function PublicationsContainer({user}:IPublicationsContainerState){
    const [posts, setPosts] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect( () => {
        axios({
            method: 'get',
            url: `http://localhost:9005/authuser/`,
            withCredentials: true,
            headers: {
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": 'http://localhost:3000',
                'Accept': 'application/json',
                'Content-Type': 'x-www-form-urlencoded',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }}).then(res => {
                axios({
                    method: 'get',
                    url: `http://localhost:9005/posts/user/${res.data.username}`,
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
                        setPosts(res.data.content);
                        res.data ? setLoading(false) : setLoading(true);
                    })
                    .catch(error => {
                        console.log(error);
                        setLoading(true);
                    })
            });

    },[isLoading]);

    function loadChange(value: boolean) {
        setLoading(value);
    }

    return (
        <div>
            <Publications loadChange={loadChange} userId={user.id} posts={posts}/>
        </div>
    );
}
