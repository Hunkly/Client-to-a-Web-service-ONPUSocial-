import React, {useEffect, useState} from 'react'

import { ChatPageContainer, UserList, Avatar, ChatList } from './ChatPage.styled';
import ChatLogo from '../../assets/img/chat.svg';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

import Chat from '../../shared/components/Chat';
import Button from '../../shared/components/Button';
import Modal from '../../shared/components/Modal';
import TextArea from "../../shared/components/TextArea";
import Input from '../../shared/components/Input/Input.component';

import IUser from "../../shared/models/User";
import IMessage from "../../shared/models/Message";
import IRoom from '../../shared/models/Room';
import IPhoto from "../../shared/models/Photo";

import {LocalStorage} from "../../actions/current";
import axios from "axios";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import StyledDialogBox from "../../shared/components/DialogBox/DialogBox.styled";
import UploadFile from "../../shared/components/UploadFile/UploadFile.component";
let stompClient: any;

export default function ChatPage() {
    const [ active, setActive ] = React.useState(0);
    let photo: IPhoto = {
        data: '',
        filename: '',
        filetype: '',
        id: -1,
    }
    let initialUsers: IUser[] = [{
        id: -1,
        first_name: '',
        last_name: '',
        birthday: -1,
        email: '',
        description: '',
        phone: '',
        studygroup: {
            id: -1,
            name_group: '',
            kafedra: {
                id: -1,
                name_kafedra: '',
                description_kafedra: '',
                faculty: {
                    id: -1,
                    faculty_name: '',
                    faculty_description: ''
                }
            },
            course: -1,
            description_group: '',
            stream: -1
        },
        colleagues:  [{
            id: -1,
            name: '',
            photo: '',
        }],
        posts: [{
            id: -1,
            name_post: '',
            content: '',
            user: '',
            restriction: -1,
            date: -1,
            isImages: false,
            user_idfield: -1,
            owner_photo: photo
        }],
        profilephoto: photo,
        username: '',
    }];
    let initialUser: IUser = {
        id: -1,
        first_name: '',
        last_name: '',
        birthday: -1,
        email: '',
        description: '',
        phone: '',
        studygroup: {
            id: -1,
            name_group: '',
            kafedra: {
                id: -1,
                name_kafedra: '',
                description_kafedra: '',
                faculty: {
                    id: -1,
                    faculty_name: '',
                    faculty_description: ''
                }
            },
            course: -1,
            description_group: '',
            stream: -1
        },
        colleagues:  [{
            id: -1,
            name: '',
            photo: '',
        }],
        posts: [{
            id: -1,
            name_post: '',
            content: '',
            user: '',
            restriction: -1,
            date: -1,
            isImages: false,
            user_idfield: -1,
            owner_photo: photo
        }],
        profilephoto: photo,
        username: '',
    };
    let chat: IMessage[] = [{
        sender: '',
        content: '',
        type: '',
        date: '',
        chat_id: -1,
        owner: initialUser
    }];
    let roomHall: IRoom[] = [{
        description: '',
        id: 0,
        members: [],
        name: '',
        owner: null,
        message: {
            sender: '',
            content: '',
            owner: initialUser,
            date: '',
            type: 'CHAT',
            chat_id: 0
        },
        chatphoto: photo
    }];


    const [message, setMessage] = useState('');
    const [rooms, setRooms] = useState(roomHall);
    const [userName, setUserName] = useState('');
    const [content, setContent] = useState(chat);
    const [filteredContent, setFilteredContent] = useState(chat);
    const [user, setUser] = useState(initialUser);
    const [users, setUsers] = useState(initialUsers);
    const [messageType, setMessageType] = useState('');
    const auth: LocalStorage = JSON.parse(localStorage.getItem('state') || '{}');
    const [login, setLogin] = useState(auth.login);
    const [subscriptions, setSubscriptions] = useState(initialUsers);
    const [subscriptionName, setSubscriptionName] = useState('');
    const [chatMembers, setChatMembers] = useState(initialUsers);
    const [chatMemberName, setChatMemberName] = useState('');
    const [isShowed, setIsShowed] = useState(false);
    const [chatName, setChatName] = useState('');
    const [chatDesc, setChatDesc] = useState('');
    const [chatPhoto, setChatPhoto] = useState(photo);
    const [toggle, setToggle] = useState(true);
    const [showNewChat, setShowNewChat] = useState(false);
    const [showManageChat, setShowManageChat] = useState(false);
    let avatar = '';

    function closeWindow(mode: 'new' | 'manage') {
        if(mode === 'new'){
            setShowNewChat(false)
        } else {
            setShowManageChat(false)
        }

    }

    function openWindow(mode: 'new' | 'manage') {
        if(mode === 'new'){
            setShowNewChat(true)
        } else {
            setShowManageChat(true)
        }
    }

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
                console.log('Компонент Chat, проверка на авторизацию: ', res.data);
                setUserName(res.data.username);
                getChats(res.data.username);
                if(res.data.profilephoto !== null) avatar = res.data.profilephoto.data;
                axios({
                    method: 'get',
                    url: `http://localhost:9005/users/${res.data.username}/subscriptions`,
                    withCredentials: true,
                    headers: {
                        "Access-Control-Allow-Credentials": true,
                        "Access-Control-Allow-Origin": 'http://localhost:3000',
                        'Accept': 'application/json',
                        'Content-Type': 'x-www-form-urlencoded',
                        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    }
                }).then( res => {
                    console.log('Subscriptions list: ', res.data);
                    setSubscriptions(res.data);
                })
                    .catch( err => {
                        return err
                    })
            })
            .catch(error => {
                console.log(error);
            });
    },[toggle]);

    function getMessages(chatId: number){
        if(chatId > 0) {
            axios({
                method: 'get',
                url: `http://localhost:9005/chats/chatmessages?chatId=${chatId}`,
                withCredentials: true,
                headers: {
                    "Access-Control-Allow-Credentials": true,
                    "Access-Control-Allow-Origin": 'http://localhost:3000',
                    'Accept': 'application/json',
                    'Content-Type': 'x-www-form-urlencoded',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }
            }) .then(res => {
                console.log('MESSAGES', res);
                res.data.map( (element: any) => {
                    setContent(prevState => {
                        if(element.message_type === "CHAT"){
                            let newState = prevState.concat({
                                sender: element.sender,
                                content: element.content,
                                type: element.message_type,
                                date: element.local_date_time,
                                chat_id: element.chat,
                                owner: element.owner
                            });

                            return newState;
                        }
                        return prevState;
                    });
                });
                setContent(prevState => {
                    setRooms(prevState2 => {
                        prevState2.map((elem) => {
                            setFilteredContent(prevState3 => {
                                let newState3 = prevState.filter(element => element.chat_id === elem.id);
                                console.log('FLITERED CONTENT', newState3);
                                return newState3;
                            });
                        });
                        return prevState2
                    });
                    return prevState;
                });
                stompClient.subscribe(`/topic/public/${chatId}`, onMessageReceived);
                console.log('Stomp client method connect', stompClient);
                stompClient.send(`/app/chat.addUser/${chatId}`,
                    {},
                    JSON.stringify({sender: login, type: 'JOIN'})
                );
                console.log(`Connected to ${chatId}`);

            }) .catch(error => {
                console.log(error);
            });

        }


    };

    function connect(){
        let socket = new SockJS('http://localhost:9005/ws');
        stompClient = Stomp.over(socket);
        console.log('Stomp client method connect', stompClient);
        stompClient.connect({}, onConnected, onError);
    }

    function getChats(login: string){
        axios({
            method: 'get',
            url: `http://localhost:9005/chats/byuser?login=${login}`,
            withCredentials: true,
            headers: {
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": 'http://localhost:3000',
                'Accept': 'application/json',
                'Content-Type': 'x-www-form-urlencoded',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        }) .then(res => {
            console.log('CHATS', res);
            setRooms(prevState => { return res.data} );
            connect();
        }) .catch(error => {
            console.log(error);
        });
    }

    function onConnected() {
        setRooms(prevState => {
            console.log('ROOMS', prevState);
            prevState.map((element: any) => {
                getMessages(element.id);
                setChatMembers(element.members);
            });
            return prevState
        });
    }

    function onError() {
        console.log('Error');
    }

    function sendMessage(event: any) {
        console.log('Stomp client method message', stompClient);
        if(message && stompClient) {
            let formData = {
                type: 'CHAT',
                content: message,
                sender: userName,
                chat_id: rooms[active].id,
            };
            stompClient.send(`/app/chat.sendMessage/${rooms[active].id}`, {}, JSON.stringify(formData));
            setMessage('');
        }

        event.preventDefault();
    }

    function onMessageReceived(payload: any) {
        let res = JSON.parse(payload.body);
        console.log('ON MESSAGE RECIEVED CHECK', res);

        if(res.type === "JOIN") {
            res.content = res.sender + ' joined!';
            setMessageType('join');
            setContent(prevState => {
                let newState = prevState.concat({
                    sender: res.sender,
                    content: res.content,
                    type: res.type,
                    date: res.local_date_time,
                    chat_id: res.chat_id,
                    owner: res.owner,
                    server_file: res.server_file
                });
                console.log('JOIN RECIEVED MESSAGE', res);
                setActive(prevState1 => {
                    setRooms( prevState2 => {
                        let currentChatIndex = prevState2.findIndex((elem)=>{if(elem.id === res.chat_id){return true} return false});
                        setFilteredContent(prevState3 =>  {
                            let newState3 = newState.filter(element => element.chat_id === prevState2[prevState1].id);
                            // @ts-ignore
                            // if(prevState2[currentChatIndex].message !== null) {prevState2[currentChatIndex].message.content = newState[newState.length - 1].content; prevState2[currentChatIndex].message.sender = newState[newState.length - 1].sender; }
                            return newState3;
                        });
                        return prevState2
                    });
                    return prevState1
                });
                return newState;
            });
        } else if (res.type === "LEAVE") {
            res.content = res.sender + ' left!';
            setMessageType('left');
            setContent(prevState => {
                let newState = prevState.concat({
                    sender: res.sender,
                    content: res.content,
                    type: res.type,
                    date: res.local_date_time,
                    chat_id: res.chat_id,
                    owner: res.owner,
                    server_file: res.server_file
                });
                setActive(prevState1 => {
                    console.log('SET ACTIVE PREV STATE', prevState1);
                    setRooms( prevState2 => {
                        setFilteredContent(prevState3 =>  {
                            let newState3 = newState.filter(element => element.chat_id === prevState2[prevState1].id);
                            // prevState2[prevState1].lastMessage = newState3[newState3.length - 1].content;
                            return newState3;
                        });
                        return prevState2
                    });
                    return prevState1
                });
                return newState;
            });
        } else if (res.type === "CHAT") {
            if(login === res.sender) setMessageType('chatHome'); else setMessageType('chatOpp');
            setContent(prevState => {
                let newState = prevState.concat({
                    sender: res.sender,
                    content: res.content,
                    type: res.type,
                    date: res.local_date_time,
                    chat_id: res.chat_id,
                    owner: res.owner,
                    server_file: res.server_file
                });
                console.log('res', res);
                setActive(prevState1 => {
                    setRooms( prevState2 => {
                        let currentChatIndex = prevState2.findIndex((elem)=>{if(elem.id === res.chat_id){return true} return false});
                        setFilteredContent(prevState3 =>  {
                            let newState3 = newState.filter(element => element.chat_id === prevState2[prevState1].id);
                            // @ts-ignore
                            if(prevState2[currentChatIndex].message !== null) {prevState2[currentChatIndex].message.content = newState[newState.length - 1].content; prevState2[currentChatIndex].message.sender = newState[newState.length - 1].sender; }
                            return newState3;
                        });
                        return prevState2
                    });
                    return prevState1
                });
                return newState;
            });
        }

        console.log('RECIEVED MESSAGE ',res);
        console.log('on msg recieve content',res.content, 'by', res.sender);
        console.log('content array', content);
        console.log('MESSAGE TYPE', messageType);
    }

    // @ts-ignore
    function tabSelect(e: number) {
        setActive(e);
        let activeTab = e;
        setFilteredContent( prevState => {
            console.log("rooms[+e.target.dataset.index]", activeTab);
            let newState = content.filter(element => element.chat_id === rooms[activeTab].id);
            if(newState.length !== 0 ) {
                // rooms[activeTab].message.content = newState[newState.length - 1].content ;
            }
            return newState;}
            );

        console.log('Filtered messages :', filteredContent);
    }

    function newChat() {
        let chat = {
            owner: userName,
            description: chatDesc,
            name: chatName,
            members: [],
            chatphoto: chatPhoto.id
        }
        if(user !== null){
            axios({
                method: 'post',
                // @ts-ignore
                url: `http://localhost:9005/chats`,
                data: chat,
                withCredentials: true,
                headers: {
                    "Access-Control-Allow-Credentials": true,
                    "Access-Control-Allow-Origin": 'http://localhost:3000',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }
            }) .then(res => {
                console.log('New chat', res);
                setIsShowed(false);
                setToggle(!toggle);
            }) .catch(error => {
                console.log(error);
            });
            closeWindow('new');
        }
    }

    function addMember(login: string) {
        if(user !== null){
            axios({
                method: 'post',
                // @ts-ignore
                url: `http://localhost:9005/chats/addmember?member=${login}&chatid=${rooms[active].id}`,
                withCredentials: true,
                headers: {
                    "Access-Control-Allow-Credentials": true,
                    "Access-Control-Allow-Origin": 'http://localhost:3000',
                    'Accept': 'application/json',
                    'Content-Type': 'x-www-form-urlencoded',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }
            }) .then(res => {
                console.log(`User ${login} was added to ${rooms[active].id} chat: ${res}`);
                let content = `${login} приглашен пользователем ${userName}`;
                setContent(prevState => {
                    let newState = prevState.concat({
                        sender: userName,
                        content: content,
                        type: "JOIN",
                        date: '',
                        chat_id: rooms[active].id,
                        owner: user,
                        server_file: user.profilephoto
                    });
                    setActive(prevState1 => {
                        console.log('SET ACTIVE PREV STATE', prevState1);
                        setRooms( prevState2 => {
                            setFilteredContent(prevState3 =>  {
                                let newState3 = newState.filter(element => element.chat_id === prevState2[prevState1].id);
                                return newState3;
                            });
                            return prevState2
                        });
                        return prevState1
                    });
                    return newState;
                });
                setToggle(!toggle);
                closeWindow('manage');
            }) .catch(error => {
                console.log(error);
            });
        }
    }

    function deleteMemberFromChat(login: string) {
        if(user !== null){
            axios({
                method: 'delete',
                url: `http://localhost:9005/chats/deleteuserfromchat?login=${login}&chatId=${rooms[active].id}`,
                withCredentials: true,
                headers: {
                    "Access-Control-Allow-Credentials": true,
                    "Access-Control-Allow-Origin": 'http://localhost:3000',
                    'Accept': 'application/json',
                    'Content-Type': 'x-www-form-urlencoded',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }
            }) .then(res => {
                console.log(`User ${login} was deleted from ${rooms[active].id} chat: ${res}`);
                let content = `${login} удалён из чата пользователем ${userName}`;
                setContent(prevState => {
                    let newState = prevState.concat({
                        sender: userName,
                        content: content,
                        type: "LEAVE",
                        date: '',
                        chat_id: rooms[active].id,
                        owner: user,
                        server_file: user.profilephoto
                    });
                    setActive(prevState1 => {
                        console.log('SET ACTIVE PREV STATE', prevState1);
                        setRooms( prevState2 => {
                            setFilteredContent(prevState3 =>  {
                                let newState3 = newState.filter(element => element.chat_id === prevState2[prevState1].id);
                                // prevState2[prevState1].lastMessage = newState3[newState3.length - 1].content;
                                return newState3;
                            });
                            return prevState2
                        });
                        return prevState1
                    });
                    return newState;
                });
                setToggle(!toggle);
                closeWindow('manage');
            }) .catch(error => {
                console.log(error);
            });
        }
    }

    function getAllUsers() {
        axios({
            method: 'get',
            url: `http://localhost:9005/users`,
            withCredentials: true,
            headers: {
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": 'http://localhost:3000',
                'Accept': 'application/json',
                'Content-Type': 'x-www-form-urlencoded',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        }) .then(res => {
            console.log('All users', res);
            setUsers(res.data.content);
        }) .catch(error => {
            console.log(error);
        });
    }

    function onFileChange(file: File){
        let formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('login', "login");
        console.log('formData', formData);
        console.log('file', file);
        axios({
            method: "post",
            url: `http://localhost:9005/files/upload`,
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
            setChatPhoto(res.data);

        }).catch(err => {
            console.log('ERR FILE', err);
        })
    }

    return(
        <ChatPageContainer>
            <div className="chat-page__container">
                <ChatList>
                        {rooms.map((n, i) => (
                            <button
                                className={`tablinks ${i === active ? 'active' : ''}`}
                                onClick={() => {tabSelect(i)}}
                                data-index={i}
                            >{ n.chatphoto ? <Avatar src={`data:image/png;base64,${n.chatphoto.data}`}/> : <Avatar src={ChatLogo}/>}<div className='message'><b>{n.name}</b> <p>{ n.message ? `${n.message.sender}: ${n.message.content}` : null}</p></div></button>
                        ))}
                </ChatList>
                <div className="chat-page__button-container">
                    <Button onClick={() => {openWindow('new')}} color="#3E76BB" activeColor="#3E76BB">
                        Новый чат
                    </Button>
                </div>
            </div>
            {
                rooms[active] ?
                    <Chat login={userName} avatar={avatar} messages={filteredContent} sendMessage={sendMessage} message={message} setMessage={setMessage} addType={messageType} chat={rooms[active]} openWindow={openWindow} userName={userName}/>
                : null
            }
            <Dialog className='dialog-box' open={showNewChat} onClose={() => {closeWindow('new')}} aria-labelledby="form-dialog-title">
                        <StyledDialogBox>
                            <DialogTitle id="form-dialog-title">Создать чат</DialogTitle>
                            <DialogContent>
                                <Input type="text" placeholder="Название" onChange={(e)=>{setChatName(e.target.value)}}/>
                                <TextArea placeholder="Описание" onChange={(e)=>{setChatDesc(e.target.value)}}/>
                                <div className="align-items-center">Фото чата:{ chatPhoto.id !== -1 ? <Avatar src={`data:image/png;base64,${chatPhoto.data}`}/> : <Avatar src={ChatLogo}/> }</div>
                                <UploadFile text={"Загрузить фото чата"} onChange={ (event) => { if(event.target.files) onFileChange(event.target.files[0]); } }/>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    color="#3E76BB"
                                    activeColor="#3E76BB"
                                    onClick={newChat}
                                >
                                    Отправить
                                </Button>
                            </DialogActions>
                        </StyledDialogBox>
            </Dialog>
            <Dialog className='dialog-box' open={showManageChat} onClose={() => {closeWindow('manage')}} aria-labelledby="form-dialog-title">
                <StyledDialogBox>
                    <DialogTitle id="form-dialog-title">Управление чатом</DialogTitle>
                    <DialogContent>
                        <UserList>
                            <div>
                                Удаление пользователя из чата
                                <hr/> <br/>
                            </div>
                            <div className={'row-box'}>
                                <select name="Users" value={chatMemberName} onChange={(e)=>{ setChatMemberName(e.target.value); console.log('SUBSCRIPTION', subscriptionName)}}>
                                    <option value={''}>Выберите пользователя</option>
                                    {
                                        rooms[active].members.map( (element: IUser) => (
                                            element.username !== userName ? <option value={element.username}>{element.username}</option> : null
                                        ))
                                    }
                                </select>
                                <Button onClick={() => {deleteMemberFromChat(chatMemberName)}} color="#FB4141" activeColor="#cd3434">
                                    Удалить из чата
                                </Button>
                            </div>
                        </UserList>
                        <UserList>
                            <div>
                                Добавить пользователя в чат
                                <hr/> <br/>
                            </div>
                            <div className={'row-box'}>
                                <select name="Users" value={subscriptionName} onChange={(e)=>{ setSubscriptionName(e.target.value); console.log('SUBSCRIPTION', subscriptionName)}}>
                                    <option value={''}>Выберите пользователя</option>
                                    {
                                        subscriptions.map( (element: IUser) => (
                                            <option value={element.username}>{element.username}</option>
                                        ))
                                    }
                                </select>
                                <Button onClick={() => {addMember(subscriptionName)}} color="#5BD391" activeColor="#2CA864">
                                    Добавить в чат
                                </Button>
                            </div>
                        </UserList>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="#3E76BB"
                            activeColor="#3E76BB"
                            onClick={() => { closeWindow('manage')}}
                        >
                            Закрыть
                        </Button>
                    </DialogActions>
                </StyledDialogBox>
            </Dialog>
        </ChatPageContainer>
    )
}

