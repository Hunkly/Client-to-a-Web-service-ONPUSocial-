import React, {useEffect, useState} from 'react';
import SockJS from 'sockjs-client';
import {Stomp} from "@stomp/stompjs";
import ChatStyled from './Chat.styled';
import IMessage from '../../models/Message';
import axios from "axios";
import DefaultPhoto from '../../../assets/img/DefaultPhoto.png';
import TextArea from "../TextArea";
import Button from '../Button';
let stompClient: any;

interface IProps {
    messages: IMessage[],
    message: string,
    sendMessage: (event: any) => void,
    setMessage: (text: string) => void,
    avatar: string,
}

export default function Chat({messages, sendMessage, avatar, setMessage, message}: IProps) {

    return(
        <ChatStyled>
            {/*<div className='title'>Общение</div>*/}
                <div className='Chat__box'>
                    {
                        messages.map((element: IMessage, index: number) => (
                            element.sender !== '' ? element.type === 'JOIN' ?
                            <div className={`Chat__message-item Chat__message-item__join`} key={index}>
                                {element.content}
                            </div> : element.type === 'CHAT' ? <div className={`Chat__message-item Chat__message-item__message`} key={index}>
                                {
                                    <div className='Chat__user-box'>
                                        {
                                            avatar !== '' ? <img className='Chat__avatar' src={`data:image/png;base64,${avatar}`} alt="userpic"/> :
                                                <img className='Chat__avatar' src={DefaultPhoto} alt="Defaultuserpic"/>
                                        }
                                        <p>{element.sender}: </p>
                                    </div>
                                }
                                {element.content}
                                </div> : <div className={`Chat__message-item Chat__message-item__left`} key={index}>
                                    {element.content}
                                </div> : null
                        ))
                    }
                </div>

                {/*<input type="text" placeholder="User name" value={userName} onChange={(event) => {*/}
                {/*    setUserName(event.target.value);*/}
                {/*}}/>*/}
                {/*<button onClick={connect}>connect</button>*/}
                <div className="Chat__send-message">
                    <TextArea id='message-input' placeholder="Message" value={message} onChange={(event) => {
                        setMessage(event.target.value);
                    }}/>
                    {/*<Button onClick={connect}>Connect</Button>*/}
                    <Button onClick={sendMessage} color="#3E76BB" activeColor="#3E76BB" maxHeight={'60px'} minWidth={'105px'}>Send</Button>
                </div>
        </ChatStyled>
    );
}
