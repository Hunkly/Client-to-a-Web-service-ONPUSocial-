import React, {useState, useEffect, useRef, useCallback} from 'react';
import axios from 'axios';
import PostsComponent from './Posts.component';
import UserModel from "../../../shared/models/User";


export function LoadPosts(pageNumber: number){
    const [posts, setPosts] = useState([]);
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
                    console.log('LoadPosts', res.data);

                    if(!toggle){
                        //@ts-ignore
                        setPosts( prevPosts => {
                                return [...new Set([...prevPosts,...res.data.content])]
                            }
                        );
                    } else {
                        setPosts(res.data.content);
                        // setToggle(true);
                    }

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
    },[toggle, pageNumber]);

    function toggleChange(value: boolean){
        setToggle(value);
        console.log('toggle changed');
    }

    return { loading, error, posts, hasMore, toggleChange }
}

interface IPublicationsContainerProps {
    user: UserModel;
}

export function PostsContainer({user}: IPublicationsContainerProps) {
    const [pageNumber, setPageNumber] = useState(0);

    const {
        posts,
        hasMore,
        loading,
        error,
        toggleChange
    }: any = LoadPosts(pageNumber);
    const observer = useRef();
    const lastPostElement = useCallback( node =>
    {
        console.log(node);
        if (loading) return;
        //@ts-ignore
        if (observer.current) observer.current.disconnect();
        //@ts-ignore
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        });
        //@ts-ignore
        if (node) observer.current.observe(node)
    }, [loading, hasMore]);

    return (
        <PostsComponent user={user} posts={posts} hasMore={hasMore} loading={loading} error={error} lastPostElement={lastPostElement} toggleChange={toggleChange}/>
    );
}