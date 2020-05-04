import React, {useEffect, useState} from 'react';
import Button from "../Button/Button.component";
import StyledProfileMenu from './ProfileMenu.styled';
import DefaultPhoto from '../../../assets/img/DefaultPhoto.png';
import axios from "axios";
import UserModel from '../../../shared/models/User';

interface IProps {
    user: UserModel;
    viewMode: 'profile' | 'otherProfile' | 'editProfile' | 'news';
    editMode: boolean;
    setEditMode: (mode: boolean) => void;
    cancelEdit?: () => void;
    updateUser?: () => void;
}

export default function ProfileMenu({updateUser,setEditMode,cancelEdit,editMode, user, viewMode}:IProps) {
    const [subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        console.log('PROFILE MENU COMPONENT', user);
        axios({
            method: 'get',
            url: `http://localhost:9005/authuser/subscriptions/${user.username}`,
            withCredentials: true,
            headers: {
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": 'http://localhost:3000',
                'Accept': 'application/json',
                'Content-Type': 'x-www-form-urlencoded',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        }).then( res => {
            console.log('Check subscribe: ', res.data);
            if(res.data) setSubscribed(true); else setSubscribed(false);
        })
            .catch( err => {
                console.log('Check subscribe error: ', err);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[subscribed]);

    function subscribe(){
        axios({
            method: 'post',
            url: `http://localhost:9005/authuser/subscriptions/${user.username}`,
            withCredentials: true,
            headers: {
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": 'http://localhost:3000',
                'Accept': 'application/json',
                'Content-Type': 'x-www-form-urlencoded',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        }).then( res => {
            console.log('Subscribe to user: ',res);
            setSubscribed(!subscribed);
        })
            .catch( err => {
                console.log('Subscribe error: ', err);
            })
    }

    function onFileChange(file: File){
        let formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('login', user.username);
        console.log('formData', formData);
        console.log('file', file);
        axios({
            method: "post",
            url: `http://localhost:9005/files/upload/profilephoto`,
            data: formData,
            withCredentials: true,
            headers: {
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": 'http://localhost:3000',
                'Accept': 'application/json',
                'Content-Type': 'x-www-form-urlencoded',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        }).then(res => {
            console.log('RES FILE', res);
        }).catch(err => {
            console.log('ERR FILE', err);
        })
        // }
    }

    return (
        <StyledProfileMenu>
            <div className="profile-menu__avatar">
                {
                    user.profilephoto ? <img src={`data:image/png;base64,${user.profilephoto.data}`} alt=""/> : <img src={DefaultPhoto} alt=""/>
                }
            </div>
            <div className="profile-menu__button-box">
                {
                    viewMode === 'profile' ?
                    !editMode ?
                        <div>
                            <Button color="#B0B0B0" activeColor="#868585" onClick={() => {setEditMode(true)}}>
                                Редактировать профиль
                            </Button>
                            <Button color="#B0B0B0" activeColor="#868585">
                                <label htmlFor='upload-photo'>Загрузить фото</label><input id="upload-photo" type="file" onChange={ (event) => { if(event.target.files) onFileChange(event.target.files[0]); } }/>
                            </Button>
                        </div>
                         :
                            <div>
                                <Button color="#58CA6B" activeColor="#439650" onClick={updateUser}>
                                    Сохранить редактирование
                                </Button>
                                <Button color="#B94D4D" activeColor="#974141" onClick={cancelEdit}>
                                    Отменить редактирование
                                </Button>
                            </div> : !subscribed ?
                        <Button color="#58CA6B" activeColor="#439650" onClick={subscribe}>
                            Подписаться
                        </Button> :
                        <Button color="#B94D4D" activeColor="#974141" onClick={subscribe}>
                            Отписаться
                        </Button>
                    }
            </div>
        </StyledProfileMenu>
    )};
