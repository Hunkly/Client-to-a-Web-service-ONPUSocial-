import React, {useState} from 'react';
import StyledPublicationItem from './PostItem.styled';
import UserPost from '../../../../shared/models/Post'
import Cross from '../../../../assets/img/cross.svg';
import Edit from '../../../../assets/img/editPen.svg'
import axios from 'axios';
import DefaultPhoto from '../../../../assets/img/DefaultPhoto.png';
import PostComments from "./PostComments";
import TextArea from "../../../../shared/components/TextArea/TextArea.component";
import Button from '../../../../shared/components/Button';

interface IPublicationItemProps {
    ref?: any;
    toggleChange: () => void;
    userID: number
    post: UserPost;
}

export default function PublicationItem({userID, ref, toggleChange, post}:IPublicationItemProps) {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(post.name_post);
    const [content, setContent] = useState(post.content);

    function setData(event: React.ChangeEvent<HTMLInputElement>){
        switch(event.target.name){
            case "title": {setTitle(event.target.value); break;}
            case "content": {setContent(event.target.value); break;}
        }
    }

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
                toggleChange();
            })
    }

    function editPost() {
        setEditMode(!editMode);
    }

    function saveChanges() {
        let today = Date.now();
        const postForm = {
            name_post: title,
            content: content,
            user: userID,
            studygroup: null,
            kafedra: null,
            faculty: null,
            subscribers: false,
            date: today.valueOf()
        };

        axios({
            method: 'put',
            url: `http://localhost:9005/posts/${post.id}`,
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
                console.log('updated successfully: ',res.data);
                setTitle(post.name_post);
                setContent(post.content);
                setEditMode(false);
                toggleChange();
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <StyledPublicationItem>
            <div className="post-item__container">
                <div className="post-item__author">
                    <div className="post-item__avatar">
                        <img src={DefaultPhoto} alt=""/>
                    </div>
                    <div className="post-item__label">{post.user}</div>
                </div>
                <div className="post-item__menu">
                    <div
                        className="post-item__menu-item"
                        onClick={editPost}
                    >
                        <img src={Edit} alt=""/>
                    </div>
                    <div
                        className="post-item__menu-item"
                        onClick={deletePost}
                    >
                        <img src={Cross} alt=""/>
                    </div>
                </div>
            </div>
            {
                editMode ?
                <div>
                    <div className="post__title">
                        <TextArea
                            name="title"
                            value={title}
                            placeholder="Title"
                            onChange={setData}
                        />
                    </div>
                    <div className="post__content">
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
                        Save changes
                    </Button>
                </div> :
                <div ref={ref}>
                    <h3>{post.name_post}</h3>
                    <p>{post.content} </p>
                </div>
            }
            {/*<div className="publication-item__picture"/>*/}
            <div className="post-item__date">{date.toDateString()}</div>
            <PostComments postID={post.id} userID={userID}/>
        </StyledPublicationItem>
    );
}
