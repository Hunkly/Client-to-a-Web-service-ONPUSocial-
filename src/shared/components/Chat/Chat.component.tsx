import React, {useEffect, useState} from 'react';
import SockJS from 'sockjs-client';
import {Stomp} from "@stomp/stompjs";
import {ChatStyled, ChatMessageItem, InfoMessageItem} from './Chat.styled';
import IMessage from '../../models/Message';
import axios from "axios";
import DefaultPhoto from '../../../assets/img/DefaultPhoto.png';
import TextArea from "../TextArea";
import Button from '../Button';
let stompClient: any;

interface IProps {
    login: string,
    messages: IMessage[],
    message: string,
    sendMessage: (event: any) => void,
    setMessage: (text: string) => void,
    avatar: string,
    addType: string
}

export default function Chat({login,messages, sendMessage, avatar, setMessage, message,addType}: IProps) {
    console.log("LOGIN", login);
    let date = '';
    return(
        <ChatStyled>
                <div className='Chat__box'>
                    {
                        messages.map((element: IMessage, index: number) => (
                            <div>
                                <ChatMessageItem type={element.type} addType={login === element.sender}>
                                    {
                                        avatar !== '' ? <img className='Chat__avatar' src={`data:image/png;base64,${avatar}`} alt="userpic"/> :
                                            <img className='Chat__avatar' src={DefaultPhoto} alt="Defaultuserpic"/>
                                    }
                                    {
                                        element.type === 'CHAT' ? `${element.sender}:  ` : null
                                    }
                                    {element.content}
                                    <br/>
                                    Дата: {date = new Date(element.date).toLocaleTimeString()}
                                </ChatMessageItem>
                            </div>
                        ))
                    }
                </div>

                <div className="Chat__send-message">
                    <TextArea id='message-input' placeholder="Message" value={message} onChange={(event) => {
                        setMessage(event.target.value);
                    }}/>
                    <Button onClick={sendMessage} color="#3E76BB" activeColor="#3E76BB" maxHeight={'60px'} minWidth={'105px'}>Send</Button>
                </div>
        </ChatStyled>
    );
}
