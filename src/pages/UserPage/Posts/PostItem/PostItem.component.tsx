import React from 'react';
import StyledPublicationItem from './PostItem.styled';
import UserPost from '../../../../shared/models/Post'
import Cross from '../../../../assets/img/cross.svg';
import axios from 'axios';
import DefaultPhoto from '../../../../assets/img/DefaultPhoto.png';
import PostComments from "./PostComments";

interface IPublicationItemProps {
    ref?: any;
    toggleChange: () => void;
    userID: number
    post: UserPost;
}

export default function PublicationItem({userID, ref, toggleChange, post}:IPublicationItemProps) {
    let date = new Date(post.date);

    function deletePost(){

        axios({
            method: 'delete',
            url: `http://localhost:9005/posts/${post.id}`,
            withCredentials: true,
            headers: {
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": 'http://localhost:3000',
                'Accept': 'application/json',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        })
            .then(res => {
                console.log(res.data);
                toggleChange();
            })
    }

    return (
        <StyledPublicationItem>
            <div className="post-item__container">
                <div className="post-item__author">
                    <div className="post-item__avatar">
                        <img src={DefaultPhoto} alt=""/>
                    </div>
                    <div className="post-item__label">{post.user}</div>
                </div>
                <div
                    className="post-item__delete-menu"
                    onClick={deletePost}
                >
                    <img src={Cross} alt=""/>
                </div>
            </div>
            <div ref={ref}>
                <h3>{post.name_post}</h3>
                <p>{post.content} </p>
            </div>
            {/*<div className="publication-item__picture"/>*/}
            <div className="post-item__date">{date.toDateString()}</div>
            <PostComments postID={post.id} userID={userID}/>
        </StyledPublicationItem>
    );
}
