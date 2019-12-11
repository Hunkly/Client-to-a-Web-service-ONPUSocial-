import React from 'react';
import StyledPublicationItem from './PublicationItem.styled';
import UserPost from '../../../../shared/models/Post'
import Cross from '../../../../assets/img/cross.png';
import axios from 'axios';
import DefaultPhoto from '../../../../assets/img/DefaultPhoto.png';

interface IPublicationItemProps {
    loadChange: (value: boolean) => void;
    post: UserPost;
}

export default function PublicationItem({loadChange, post}:IPublicationItemProps) {
    let date = new Date(post.date);

    function deletePost(){

        axios
            .delete(`http://localhost:9005/posts/${post.id}`)
            .then(res => {
                console.log(res.data);
                loadChange(true);
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
            <div>
                <h3>{post.name_post}</h3>
                <p>{post.content} </p>
            </div>
            {/*<div className="publication-item__picture"/>*/}
            <div className="publication-item__date">Date: {date.toDateString()}</div>
        </StyledPublicationItem>
    );
}
