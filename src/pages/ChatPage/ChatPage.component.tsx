import React, {useEffect, useState} from 'react'
import { ChatPageContainer, UserList } from './ChatPage.styled';
import Chat from '../../shared/components/Chat';
import Button from '../../shared/components/Button';
import IMessage from "../../shared/models/Message";
import IRoom from '../../shared/models/Room'
import axios from "axios";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import IUser from "../../shared/models/User";
let stompClient: any;

export default function ChatPage() {
    const [ active, setActive ] = React.useState(0);
    // let active = 0;
    let chat: IMessage[] = [{
        sender: '',
        content: '',
        type: '',
        date: '',
        chat_id: -1
    }];
    let roomHall: IRoom[] = [{
        description: '',
        id: 0,
        members: [],
        name: '',
        owner: null,
        lastMessage: ''
    }];
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
            owner_photo: {
                data: '',
                filename: '',
                filetype: '',
                id: -1,
            }
        }],
        profilephoto: {
            data: '',
            filename: '',
            filetype: '',
            id: -1,
        },
        username: '',
    }];
    let userObj: IUser | null = null;
    const [message, setMessage] = useState('');
    const [rooms, setRooms] = useState(roomHall);
    const [userName, setUserName] = useState('');
    const [content, setContent] = useState(chat);
    const [filteredContent, setFilteredContent] = useState(chat);
    const [user, setUser] = useState(userObj);
    const [users, setUsers] = useState(initialUsers);
    const [messageType, setMessageType] = useState('');
    let login = '';
    let avatar = '';

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
                setUser(res.data);
                setUserName(res.data.username);
                login = res.data.username;
                if(res.data.profilephoto !== null) avatar = res.data.profilephoto.data;
                getMessages(res.data.username);
                connect();

            })
            .catch(error => {
                console.log(error);
            });

    },[]);

    function getMessages(userName: string){
        axios({
            method: 'get',
            url: `http://localhost:9005/chats/messages?login=${userName}`,
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
                            chat_id: element.chat
                        });
                        return newState;
                    }
                    return prevState;

                });
            })

        }) .catch(error => {
            console.log(error);
        });
    };

    function connect(){
        let socket = new SockJS('http://localhost:9005/ws');
        stompClient = Stomp.over(socket);
        console.log('Stomp client method connect', stompClient);
        stompClient.connect({}, onConnected, onError);
    }

    function onConnected() {
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
            console.log('CHATS', res)
            setRooms(res.data)
            res.data.map((element: any) => {
                stompClient.subscribe(`/topic/public/${element.id}`, onMessageReceived);
                console.log('Stomp client method connect', stompClient);
                stompClient.send(`/app/chat.addUser/${element.id}`,
                    {},
                    JSON.stringify({sender: login, type: 'JOIN'})
                );
                console.log(`Connected to ${element.id}`);
            })
        }) .catch(error => {
            console.log(error);
        });


    }

    function onError() {
        console.log('Error');
    }

    function sendMessage(event: any) {
        console.log('Message', message);
        console.log('Stomp client method message', stompClient);
        if(message && stompClient) {
            let chatMessage: IMessage = {
                sender: userName,
                content: message,
                type: 'CHAT',
                date: '',
                chat_id: rooms[active].id
            };
            let formData = {
                type: 'CHAT',
                content: message,
                sender: userName
            };
            console.log('chatMessage', chatMessage);
            stompClient.send(`/app/chat.sendMessage/${rooms[active].id}`, {}, JSON.stringify(chatMessage));
            setMessage('');
            console.log('formData', formData);
        }

        event.preventDefault();
    }

    function onMessageReceived(payload: any) {
        let res = JSON.parse(payload.body);

        if(res.type === "JOIN") {
            res.content = res.sender + ' joined!';
            setMessageType('join');
            setContent(prevState => {
                console.log('CONTENT', prevState);
                let newState = prevState.concat({
                    sender: res.sender,
                    content: res.content,
                    type: res.type,
                    date: res.local_date_time,
                    chat_id: res.chat_id
                });
                setActive(prevState1 => {
                    console.log('SET ACTIVE PREV STATE', prevState1);
                    setRooms( prevState2 => {
                        setFilteredContent(prevState3 =>  {
                            let newState3 = newState.filter(element => element.chat_id === prevState2[prevState1].id);
                            prevState2[prevState1].lastMessage = newState[newState.length-1].content;
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
                    chat_id: res.chat_id
                });
                setActive(prevState1 => {
                    console.log('SET ACTIVE PREV STATE', prevState1);
                    setRooms( prevState2 => {
                        setFilteredContent(prevState3 =>  {
                            let newState3 = newState.filter(element => element.chat_id === prevState2[prevState1].id);
                            prevState2[prevState1].lastMessage = newState[newState.length-1].content;
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
                    chat_id: res.chat_id
                });
                console.log('res', res);
                setActive(prevState1 => {
                    console.log('SET ACTIVE PREV STATE', prevState1);
                    setRooms( prevState2 => {
                        setFilteredContent(prevState3 =>  {
                            let newState3 = newState.filter(element => element.chat_id === prevState2[prevState1].id);
                            prevState2[prevState1].lastMessage = newState[newState.length-1].content;
                            return newState3;
                        });
                        return prevState2
                    });
                    return prevState1
                });
                return newState;
            });
        }

        console.log('res',res);
        console.log('on msg recieve content',res.content, 'by', res.sender);
        console.log('content array', content);
        console.log('MESSAGE TYPE', messageType);
    }

    useEffect(() => {
        setRooms( prevState2 => {
            prevState2.map( (elem) => {
                setFilteredContent(prevState3 =>  {
                    let newState3 = content.filter(element => element.chat_id === elem.id);
                    console.log('newState3' , newState3);
                    if(newState3.length !== 0) {
                    elem.lastMessage = newState3[newState3.length-1].content;
                    }
                    return prevState3;
                });
            });
            return prevState2
        })
    },[content]);

    // @ts-ignore
    function tabSelect(e) {
        setActive(+e.target.dataset.index);
        let activeTab = +e.target.dataset.index;
        setFilteredContent( prevState => {
            console.log("rooms[+e.target.dataset.index]", activeTab);
            let newState = content.filter(element => element.chat_id === rooms[activeTab].id);
            if(newState.length !== 0) {
                rooms[activeTab].lastMessage = newState[newState.length - 1].content;
            }
            return newState;}
            );

        console.log('Filtered messages :', filteredContent);
    }

    function newChat() {
        if(user !== null){
            axios({
                method: 'post',
                // @ts-ignore
                url: `http://localhost:9005/chats/?owner=${user.username}`,
                withCredentials: true,
                headers: {
                    "Access-Control-Allow-Credentials": true,
                    "Access-Control-Allow-Origin": 'http://localhost:3000',
                    'Accept': 'application/json',
                    'Content-Type': 'x-www-form-urlencoded',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }
            }) .then(res => {
                console.log('New chat', res)
            }) .catch(error => {
                console.log(error);
            });
        }
    }

    function addMember() {
        let member = 'Oligator1303';
        if(user !== null){
            axios({
                method: 'post',
                // @ts-ignore
                url: `http://localhost:9005/chats/addmember?member=${member}&chatid=${rooms[active].id}`,
                withCredentials: true,
                headers: {
                    "Access-Control-Allow-Credentials": true,
                    "Access-Control-Allow-Origin": 'http://localhost:3000',
                    'Accept': 'application/json',
                    'Content-Type': 'x-www-form-urlencoded',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }
            }) .then(res => {
                console.log('New chat', res)
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


    return(
        <ChatPageContainer>
            <div className="chat-page__container">
                <div className="chat-page__list">
                    <div className="tab">
                        {rooms.map((n, i) => (
                            <button
                                className={`tablinks ${i === active ? 'active' : ''}`}
                                onClick={tabSelect}
                                data-index={i}
                            >{n.id} {n.lastMessage}</button>
                        ))}
                    </div>
                </div>
                {
                    rooms[active] ?
                        <div className="tabcontent chat-page__chat">
                            <div>{rooms[active].id}  active = {active}</div>
                            <Chat login={userName} avatar={avatar} messages={filteredContent} sendMessage={sendMessage} message={message} setMessage={setMessage} addType={messageType}/>
                        </div> : null
                }
                <UserList>
                    <select name="Users">
                        {
                            users.map( (element: IUser) => (
                                <option value={element.username}>{element.username}</option>
                            ))
                        }
                    </select>
                </UserList>
            </div>
            <Button onClick={newChat} color="#3E76BB" activeColor="#3E76BB">
                Новый чат
            </Button>
            <Button onClick={addMember} color="#3E76BB" activeColor="#3E76BB">
                Добавить пользователя
            </Button>
            <Button onClick={getAllUsers} color="#3E76BB" activeColor="#3E76BB">
                Получить список пользователей
            </Button>
        </ChatPageContainer>

    )
}
