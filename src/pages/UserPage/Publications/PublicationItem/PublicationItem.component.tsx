import React from 'react';
import StyledPublicationItem from './PublicationItem.styled';
import UserPost from '../../../../shared/models/Post'
import Cross from '../../../../assets/img/cross.svg';
import axios from 'axios';
import DefaultPhoto from '../../../../assets/img/DefaultPhoto.png';
import PublicationComments from "./PublicationComments";

interface IPublicationItemProps {
    ref?: any;
    toggleChange: (value:boolean) => void;
    post: UserPost;
}

export default function PublicationItem({ref, toggleChange, post}:IPublicationItemProps) {
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
                toggleChange(true);
                // LoadPosts(0, true);
            })
    }

    return (
        <StyledPublicationItem>
            <div className="publication-item__container">
                <div className="publication-item__author">
                    <div className="publication-item__avatar">
                        <img src={DefaultPhoto} alt=""/>
                    </div>
                    <div className="publication-item__label">{post.user}</div>
                </div>
                <div
                    className="publication-item__delete-menu"
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
            <div className="publication-item__date">Date: {date.toDateString()}</div>
            <PublicationComments comments={false}/>
        </StyledPublicationItem>
    );
}
