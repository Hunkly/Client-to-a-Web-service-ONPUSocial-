import React, {useEffect, useState} from 'react'
import ChatPageStyled from './ChatPage.styled';
import Chat from '../../shared/components/Chat';
import IMessage from "../../shared/models/Message";
import axios from "axios";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
let stompClient: any;

export default function ChatPage() {
    const [chatID, setChatID] = useState('123');
    const [ active, setActive ] = React.useState(0);
    let chat: IMessage[] = [{
        sender: '',
        content: '',
        type: ''
    }];
    const [message, setMessage] = useState('');
    // const [messageType, setMessageType] = useState('');
    const [userName, setUserName] = useState('');
    const [content, setContent] = useState(chat);
    const [user, setUser] = useState({});
    let login = '';
    let avatar = '';
    let messageType = '';
    const items = [
        { id: 'London' },
        { id: 'Paris' },
        { id: 'Tokyo' },
    ];

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
                connect();
            })
            .catch(error => {
                console.log(error);
            });
    },[]);

    // useEffect(() => {
    //     onConnected();
    // },[chatID]);

    function connect(){
        let socket = new SockJS('http://localhost:9005/ws');
        stompClient = Stomp.over(socket);
        console.log('Stomp client method connect', stompClient);

        stompClient.connect({}, onConnected, onError);
    }

    function onConnected() {
        items.map((element) => {
            stompClient.subscribe(`/topic/public/${element.id}`, onMessageReceived);
            console.log('Stomp client method connect', stompClient);
            stompClient.send(`/app/chat.addUser/${element.id}`,
                {},
                JSON.stringify({sender: login, type: 'JOIN'})
            );
            console.log(`Connected to ${element.id}`);
        })

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
                type: 'CHAT'
            };
            console.log('chatMessage', chatMessage);
            stompClient.send(`/app/chat.sendMessage/${items[active].id}`, {}, JSON.stringify(chatMessage));
            setMessage('');
        }
        event.preventDefault();
    }

    function onMessageReceived(payload: any) {
        let res = JSON.parse(payload.body);

        if(res.type === 'JOIN') {
            res.content = res.sender + ' joined!';
            messageType = 'join';
            setContent(prevState => {
                return prevState.concat({
                    sender: res.sender,
                    content: res.content,
                    type: res.type
                })
            });
        } else if (res.type === 'LEAVE') {
            res.content = res.sender + ' left!';
            messageType = 'left';
            setContent(prevState => {
                return prevState.concat({
                    sender: res.sender,
                    content: res.content,
                    type: res.type
                })
            });
        } else if (res.type === 'CHAT') {
            if(login === res.sender) messageType = 'chatHome'; else messageType = 'chatOpp';
            setContent(prevState => {
                return prevState.concat({
                    sender: res.sender,
                    content: res.content,
                    type: res.type
                })
            });
        }

        console.log('res',res);
        console.log('on msg recieve content',res.content, 'by', res.sender);
        console.log('content array', content);
        console.log('MESSAGE TYPE', messageType);
    }

    // @ts-ignore
    function tabSelect(e) {
        setActive(+e.target.dataset.index)
    }

    return(
        <ChatPageStyled>
            Chat page
            <div className="chat-page__container">
                <div className="chat-page__list">
                    <div className="tab">
                        {items.map((n, i) => (
                            <button
                                className={`tablinks ${i === active ? 'active' : ''}`}
                                onClick={tabSelect}
                                data-index={i}
                            >{n.id} {content[content.length-1].sender}: {content[content.length-1].content}</button>
                        ))}
                    </div>
                </div>
                {
                    items[active] ?
                        <div className="tabcontent chat-page__chat">
                            <div>{items[active].id}</div>
                            <Chat avatar={avatar} messages={content} sendMessage={sendMessage} message={message} setMessage={setMessage}/>
                        </div> : null
                }

            </div>
        </ChatPageStyled>

    )
}
