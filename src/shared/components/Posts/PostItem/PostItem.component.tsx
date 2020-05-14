import React, {useEffect, useState} from 'react';
import StyledPublicationItem from './PostItem.styled';
import UserPost from '../../../models/Post'
import Cross from '../../../../assets/img/cross.svg';
import Edit from '../../../../assets/img/editPen.svg'
import axios from 'axios';
import DefaultPhoto from '../../../../assets/img/DefaultPhoto.png';
import PostComments from "./PostComments";
import TextArea from "../../TextArea/TextArea.component";
import Button from '../../Button';

interface IPublicationItemProps {
    ref?: any;
    toggleChange: () => void;
    post: UserPost;
    viewMode: 'profile' | 'otherProfile'
}

export default function PublicationItem({viewMode,ref, toggleChange, post}:IPublicationItemProps) {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(post.name_post);
    const [content, setContent] = useState(post.content);
    const [userId, setUserId] = useState(0);
    // const [photo, setPhoto] = useState();
    console.log('post user', post);
    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:9005/authuser`,
            withCredentials: true,
            headers: {
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": 'http://localhost:3000',
                'Accept': 'application/json',
                'Content-Type': 'x-www-form-urlencoded',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        })
            .then(res => {
                console.log('Компонент PublicationItem, проверка на авторизацию: ', res.data);
                setUserId(res.data.id);
                // setPhoto(res.data.profilephoto.data);
            })
            .catch(error => {
                console.log(error);
            });
    },[]);

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
        console.log('edit post', post);
        let today = Date.now();
        const postForm = {
            name_post: title,
            content: content,
            user: post.user_idfield,
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
                <a href={`/users/${post.user}`}>
                    <div className="post-item__author">
                        <div className="post-item__avatar">
                            {
                                post.owner_photo !== null ? <img src={`data:image/png;base64,${post.owner_photo.data}`} alt=""/> : <img src={DefaultPhoto} alt=""/>
                            }
                        </div>
                        <div className="post-item__label">{post.user}</div>
                    </div>
                </a>
                {
                    viewMode === 'profile' ? <div className="post-item__menu">
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
                    </div> : null
                }
            </div>
            {
                editMode ?
                <div>
                    <div className="post__title">
                        <TextArea
                            name="title"
                            value={title}
                            placeholder="Введите заголовок"
                            onChange={setData}
                        />
                    </div>
                    <div className="post__content">
                        <TextArea
                            name="content"
                            value={content}
                            placeholder="Расскажите о чём-нибудь"
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
                <div ref={ref}>
                    <h3>{post.name_post}</h3>
                    <p>{post.content} </p>
                </div>
            }
            {/*<div className="publication-item__picture"/>*/}
            <div className="post-item__date">{date.toDateString()}</div>
            <PostComments postID={post.id} userID={userId}/>
        </StyledPublicationItem>
    );
}
