import React, {useState} from 'react';
import StyledPublicationItem from './NewPublication.styled';
import UserPost from '../../../../shared/models/Post'
import TextArea from "../../../../shared/components/TextArea";
import Button from "../../../../shared/components/Button";
import axios from "axios";

interface INewPublicationProps {
    toggleChange: (value: boolean) => void;
    userId: number
    post?: UserPost;
}

export default function NewPublication({toggleChange ,post,userId}:INewPublicationProps) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

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
        if(title && content){
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
                    // LoadPosts(0, true)
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    return (
        <StyledPublicationItem>
            Create new post
            <div className="new-publication__title">
                <TextArea
                    name="title"
                    value={title}
                    placeholder="Title"
                    onChange={setData}
                />
            </div>
            <div className="new-publication__content">
                <TextArea
                    name="content"
                    value={content}
                    placeholder="Content"
                    onChange={setData}
                />
            </div>
            <div className="new-publication__button-container">
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
