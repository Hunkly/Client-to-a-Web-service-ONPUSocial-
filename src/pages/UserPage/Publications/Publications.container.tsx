import React, {useState, useEffect} from 'react';
import axios from 'axios';


export function LoadPosts(pageNumber: number, toggle: boolean){
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(false);

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
                    console.log('LoadPosts', res.data);
                    //@ts-ignore
                    setPosts( prevPosts => {
                        //@ts-ignore
                        return [...new Set([...prevPosts,...res.data.content])]
                    }
                    );
                    setHasMore(res.data.content.length > 0);
                    setLoading(false);
                    // setToggle(toggle);
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
    },[pageNumber]);

    return { loading, error, posts, hasMore }
}
