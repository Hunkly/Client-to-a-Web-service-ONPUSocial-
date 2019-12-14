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
    //user: UserModel,
    pageNumber: number
}

let list: CurrentSession = JSON.parse(localStorage.getItem('state') || '{}');
console.log(list);
saveState(list);
console.log('Store ', Store.getState());

export default function PublicationsContainer(pageNumber: number){
    const [posts, setPosts] = useState([]);
    //const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [toggle, setToggle] = useState(false);

    useEffect( () => {
        setLoading(true);
        setError(false);
        let cancel: any;
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
                //@ts-ignore
                url: `http://localhost:9005/posts/user/${res.data.username}?page=${pageNumber}`,
                withCredentials: true,
                //@ts-ignore
                params: { page: pageNumber },
                cancelToken: new axios.CancelToken(c => cancel = c),
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
                    //@ts-ignore
                    setPosts( prevPosts => {
                        // @ts-ignore
                        return [...new Set([...res.data.content, ...prevPosts])]
                    });
                    setHasMore(res.data.content.length > 0);
                    setLoading(false);
                })
                .catch(error => {
                    if(axios.isCancel(error)) return;
                    console.log(error);
                    setError(true);
                })
        })
            .catch(
                error => {
                    console.log(error)
                }
            )
//@ts-ignore
    },[toggle, pageNumber]);


    function toggleChange(value: boolean) {
        setToggle(!value);
    }

    return { loading, error, posts, hasMore, toggleChange }
}
