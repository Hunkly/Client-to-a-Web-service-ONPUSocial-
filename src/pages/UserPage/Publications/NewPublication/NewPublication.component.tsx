import React, {useState} from 'react';
import StyledPublicationItem from './NewPublication.styled';
import UserPost from '../../../../shared/models/Post'
import TextArea from "../../../../shared/components/TextArea";
import Button from "../../../../shared/components/Button";
import axios from "axios";

interface INewPublicationProps {
    loadChange: (value: boolean) => void;
    userId: number
    post?: UserPost;
}

export default function NewPublication({loadChange ,post,userId}:INewPublicationProps) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        switch(event.target.name){
            case "title": {setTitle(event.target.value); break;}
            case "content": {setContent(event.target.value); break;}
        }
    }

    function handleSubmit(){
        let today = Date.now();
        const postForm = {
            name_post: title,
            content: content,
            user: userId,
            studygroup: 2,
            kafedra: 1,
            faculty: 1,
            subscribers: false,
            date: today.valueOf()
        };


        console.log(postForm);
        if(title && content){
            axios
                .post(`http://localhost:9005/posts`, postForm)
                .then(res => {
                    console.log(res.data);
                    setTitle('');
                    setContent('');
                    loadChange(true);
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
                    onChange={handleChange}
                />
            </div>
            <div className="new-publication__content">
                <TextArea
                    name="content"
                    value={content}
                    placeholder="Content"
                    onChange={handleChange}
                />
            </div>
            <div className="new-publication__button-container">
                <Button
                    color="#61BB9D"
                    activeColor="#4F977F"
                    onClick={handleSubmit}
                >
                    Send
                </Button>
            </div>
        </StyledPublicationItem>
    );
}
