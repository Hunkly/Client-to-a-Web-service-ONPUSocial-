import React from 'react';
import StyledPostCommentItem from './PostCommentItem.styled';
import IComment from "../../../../../../shared/models/Comment";
import DefaultPhoto from "../../../../../../assets/img/DefaultPhoto.png";

interface PostComment {
    comment: IComment
}

export default function PostCommentItem({comment}: PostComment){

    return(
        <StyledPostCommentItem>
            <div className="post-comment__author">
                <div className="post-comment__author-avatar">
                    <img src={DefaultPhoto} alt=""/>
                </div>
                <div className="post-comment__author-label">{comment.user.username}</div>
            </div>
            <div>{comment.content}</div>
        </StyledPostCommentItem>
    )
}