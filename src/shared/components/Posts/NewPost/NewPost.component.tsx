import React, {useState} from 'react';
import StyledPublicationItem from './NewPost.styled';
import TextArea from "../../TextArea";
import Button from "../../Button";
import axios from "axios";

interface INewPublicationProps {
    toggleChange: () => void;
    userId: number
}

export default function NewPost({userId, toggleChange }:INewPublicationProps) {
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
            Создайте новый пост
            <div className="new-post__title">
                <TextArea
                    name="title"
                    value={title}
                    placeholder="Введите заголовок"
                    onChange={setData}
                />
            </div>
            <div className="new-post__content">
                <TextArea
                    name="content"
                    value={content}
                    placeholder="Расскажите о чём-нибудь"
                    onChange={setData}
                />
            </div>
            <div className="new-post__button-container">
                <Button
                    color="#61BB9D"
                    activeColor="#4F977F"
                    onClick={createPost}
                >
                    Отправить
                </Button>
            </div>
        </StyledPublicationItem>
    );
}
