import React from 'react';
import StyledPublicationComments from './PostComments.styled';
import PostCommentItem from './PostCommentItem';
import IComment from '../../../../../shared/models/Comment';
import NewComment from "./NewComment";

interface IComments {
    userID: number,
    postID: number,
    comments: IComment[] | null
    toggleChange: () => void
}

export default function PublicationComments({userID, postID, comments, toggleChange}: IComments){
    console.log('comments', comments);
    if(comments){
        return (
            <StyledPublicationComments>
                {/*<div className='post-comments__title'>Comments:</div>*/}
                { comments.map((comment: IComment) => {
                    return <PostCommentItem comment={comment} toggleChange={toggleChange} key={comment.id}/>
                }) }
                <NewComment postID={postID} userID={userID} toggleChange={toggleChange}/>
            </StyledPublicationComments>
        )
    } else {
        return (
            <StyledPublicationComments>
                none
            </StyledPublicationComments>
        )
    }

}