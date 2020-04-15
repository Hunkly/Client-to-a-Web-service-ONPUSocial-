import React, {useState} from 'react'
import NewCommentStyled from './NewComment.styled'
import TextArea from "../../../../TextArea";
import Button from "../../../../Button/Button.component";
import axios from "axios";

interface NewCommentProps {
    userID: number,
    postID: number;
    toggleChange: () => void;
}

export default function NewComment({userID, postID, toggleChange}: NewCommentProps){
    const [comment, setComment] = useState('');

    function setData(event: React.ChangeEvent<HTMLInputElement>){
        setComment(event.target.value);
    }

    function createComment(){
        const commentForm = {
            content: comment,
            user: userID,
            post: postID
        };

        console.log('Comment form: ', commentForm);
        if(comment){
            axios({
                method: 'post',
                url: `http://localhost:9005/postscomments`,
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
                    console.log(res.data);
                    setComment('');
                    toggleChange();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    return(
        <NewCommentStyled>
            <TextArea
                placeholder="Оставьте ваш комментарий"
                value={comment}
                onChange={setData}
            />
            <Button
                color="#61BB9D"
                activeColor="#4F977F"
                onClick={createComment}
            >
                Отправить
            </Button>
        </NewCommentStyled>
    )
}
