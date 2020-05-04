import React, {useState} from 'react';
import StyledPostCommentItem from './PostCommentItem.styled';
import IComment from "../../../../../models/Comment";
import DefaultPhoto from "../../../../../../assets/img/DefaultPhoto.png";
import Cross from "../../../../../../assets/img/cross.svg";
import axios from "axios";
import Edit from "../../../../../../assets/img/editPen.svg";
import TextArea from "../../../../TextArea/TextArea.component";
import Button from "../../../../Button/Button.component";

interface PostComment {
    comment: IComment,
    toggleChange: () => void,
    viewMode: 'own' | 'notOwn'
}

export default function PostCommentItem({viewMode, comment, toggleChange}: PostComment){
    const [editMode, setEditMode] = useState(false);
    const [content, setContent] = useState(comment.content);

    function setData(event: React.ChangeEvent<HTMLInputElement>){
        switch(event.target.name){
            case "content": {setContent(event.target.value); break;}
        }
    }

    function deleteComment() {
        axios({
            method: 'delete',
            url: `http://localhost:9005/postscomments/${comment.id}`,
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

    function editComment() {
        setEditMode(!editMode);
    }

    function saveChanges() {
        const commentForm = {
            content: content,
            user: comment.user.id,
            post: comment.post
        };
        console.log('comment form: ', commentForm);
        axios({
            method: 'put',
            url: `http://localhost:9005/postscomments/${comment.id} `,
            withCredentials: true,
            data: commentForm,
            headers: {
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": 'http://localhost:3000',
                'Accept': 'application/json',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        })
            .then(res => {
                console.log('updated successfully: ',res.data);
                setContent(comment.content);
                setEditMode(false);
                toggleChange();
            })
            .catch(error => {
                console.log(error);
            });
    }

    return(
        <StyledPostCommentItem>
            <div className="post-comment__container">
                <a href={`/users/${comment.user.username}`}>
                    <div className="post-comment__author">
                        <div className="post-comment__author-avatar">
                            <img src={DefaultPhoto} alt=""/>
                        </div>
                        <div className="post-comment__author-label">{comment.user.username}</div>
                    </div>
                </a>
                {
                    viewMode === 'own' ?
                    <div className="post-comment-item__menu">
                    <div
                        className="post-comment-item__menu-item"
                        onClick={editComment}
                    >
                        <img src={Edit} alt=""/>
                    </div>
                    <div
                        className="post-comment-item__menu-item"
                        onClick={deleteComment}
                    >
                        <img src={Cross} alt=""/>
                    </div>
                </div> : null
                }
            </div>
            {
                editMode ?
                    <div>
                        <div className="post-comment__content">
                            <TextArea
                                name="content"
                                value={content}
                                placeholder="Content"
                                onChange={setData}
                            />
                        </div>
                        <Button
                            color="#61BB9D"
                            activeColor="#4F977F"
                            onClick={saveChanges}
                        >
                            Сохранить изменения
                        </Button>
                    </div> :
                    <div>{comment.content}</div>
            }
        </StyledPostCommentItem>
    )
}
