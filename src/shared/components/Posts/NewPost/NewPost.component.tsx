import React, {useEffect, useState} from 'react';
import StyledPublicationItem from './NewPost.styled';
import UserPost from '../../../models/Post'
import TextArea from "../../TextArea";
import Button from "../../Button";
import axios from "axios";

interface INewPublicationProps {
    toggleChange: () => void;
    userId: number
    post?: UserPost;
}

export default function NewPost({toggleChange , userId}:INewPublicationProps) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [user, setUser] = useState({});

    useEffect(() => {

    })

    function setData(event: React.ChangeEvent<HTMLInputElement>){
        switch(event.target.name){
            case "title": {setTitle(event.target.value); break;}
            case "content": {setContent(event.target.value); break;}
        }
    }

    function createPost(){
        let today = Date.now();
        const postForm = {
            name_post: title,
            content: content,
            user: userId,
            studygroup: null,
            kafedra: null,
            faculty: null,
            subscribers: false,
            date: today.valueOf()
        };


        console.log(postForm);
        if(content){
            axios({
                method: 'post',
                url: `http://localhost:9005/posts`,
                withCredentials: true,
                data: postForm,
                headers: {
                    "Access-Control-Allow-Credentials": true,
                    "Access-Control-Allow-Origin": 'http://localhost:3000',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }
            })
                .then(res => {
                    console.log(res.data);
                    setTitle('');
                    setContent('');
                    toggleChange();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    return (
        <StyledPublicationItem>
            Create new post
            <div className="new-post__title">
                <TextArea
                    name="title"
                    value={title}
                    placeholder="Title"
                    onChange={setData}
                />
            </div>
            <div className="new-post__content">
                <TextArea
                    name="content"
                    value={content}
                    placeholder="Content"
                    onChange={setData}
                />
            </div>
            <div className="new-post__button-container">
                <Button
                    color="#61BB9D"
                    activeColor="#4F977F"
                    onClick={createPost}
                >
                    Send
                </Button>
            </div>
        </StyledPublicationItem>
    );
}
