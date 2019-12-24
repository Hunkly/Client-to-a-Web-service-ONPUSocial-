import React, {useEffect, useState} from 'react';
import axios from 'axios'
import PostsComments from './PostComments.component';

interface IComments {
    //comments: boolean,
    postID: number,
    userID: number
}

export default function PostCommentsContainer({userID, postID}: IComments){
    const [comments, setComments] = useState([]);

    useEffect(
        ()=>{
            axios({
                method: 'get',
                url: `http://localhost:9005/postscomments?postid=${postID}`,
                withCredentials: true,
                headers: {
                    "Access-Control-Allow-Credentials": true,
                    "Access-Control-Allow-Origin": 'http://localhost:3000',
                    'Accept': 'application/json',
                    'Content-Type': 'x-www-form-urlencoded',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }
            }).then( res => {
                console.log('Get comments from server: ', res.data)
                setComments(res.data.content);
            })
                .catch( err => {
                    console.log('Get comments error: ', err);
                })
        }, [postID]
    )

    return(
        <PostsComments postID={postID} userID={userID} comments={comments}/>
    )

}