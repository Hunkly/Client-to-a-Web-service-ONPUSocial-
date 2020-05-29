import React, {useEffect, useState} from 'react';
import SockJS from 'sockjs-client';
import {Stomp} from "@stomp/stompjs";
import {ChatStyled, ChatMessageItem, Avatar, InfoMessageItem, DateMessageItemBlock, Sender, Info} from './Chat.styled';
import IMessage from '../../models/Message';
import axios from "axios";
import DefaultPhoto from '../../../assets/img/DefaultPhoto.png';
import {ReactComponent as Gear} from '../../../assets/img/gear.svg';
import TextArea from "../TextArea";
import Button from '../Button';
import IRoom from "../../models/Room";
import ChatLogo from "../../../assets/img/chat.svg";
let stompClient: any;

interface IProps {
    login: string,
    messages: IMessage[],
    message: string,
    sendMessage: (event: any) => void,
    setMessage: (text: string) => void,
    avatar: string,
    addType: string,
    chat: IRoom,
    openWindow: (mode: 'new' | 'manage') => void,
    userName: string
}

export default function Chat({login,messages, sendMessage, avatar, setMessage, message,addType, chat, openWindow, userName}: IProps) {
    console.log("MESSAGES", messages);
    let date = '';

    useEffect(() => {
        let chat = document.getElementsByClassName("Chat__box");
        chat[0].scrollTop = chat[0].scrollHeight;
    })

    const DateMessageItem = (item: IMessage, index: number) => {
        let now = new Date();
        let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let birth = new Date(item.date);
        let prevMessageDate = new Date(index === 0 ? messages[index].date : messages[index-1].date);
        let title;

        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Nov','Dec'];
        title = birth.getDate()+' '+months[birth.getMonth()]+' '+birth.getFullYear();

        if(index===0) return <DateMessageItemBlock>{title}</DateMessageItemBlock>
        else {
            if(birth.getDate()!==prevMessageDate.getDate()){
                if(today.getDate()-birth.getDate()===0) return <DateMessageItemBlock>Today</DateMessageItemBlock>
                else if(today.getDate()-birth.getDate()===0) return <DateMessageItemBlock>Yesterday</DateMessageItemBlock>
                else if(today.getDate()-birth.getDate()>2) return <DateMessageItemBlock>{title}</DateMessageItemBlock>
            }
            else return null
        }
    }



    return(
        <ChatStyled>
            <Info>
                <div className='flex-box'>
                    { chat.chatphoto ? <Avatar src={`data:image/png;base64,${chat.chatphoto.data}`}/> : <Avatar src={ChatLogo}/>}
                    <div className="column">
                        <div>{chat.name}</div>
                        <p>{chat.members.length} учасников</p>
                    </div>
                </div>
                {
                    //@ts-ignore
                    chat.owner ? chat.owner.username === userName ? <div onClick={() => {openWindow('manage')}}>
                        <Gear className='icon'/>
                    </div> : null : null
                }

            </Info>

            <div className='Chat__box'>
                {
                    messages.map((element: IMessage, index: number) => (
                        <div>
                            {DateMessageItem(element, index)}
                            <ChatMessageItem type={element.type} addType={login === element.sender}>
                                <div>
                                {
                                    element.type === "LEAVE" || element.type === "JOIN" ? null : element.owner !== undefined ? element.owner.profilephoto ? <Avatar src={`data:image/png;base64,${element.owner.profilephoto.data}`} alt={`Avatar: ${element.sender}`}/> :
                                    <Avatar src={DefaultPhoto} alt={`Default avatar: ${element.sender}`}/> : element.server_file ? <Avatar src={`data:image/png;base64,${element.server_file.data}`} alt={`Avatar: ${element.sender}`}/> :
                                        <Avatar src={DefaultPhoto} alt="Defaultuserpic"/>
                                }
                                </div>
                                <div className='column'>
                                <div>
                                {
                                    element.type === 'CHAT' ? `${element.sender}:  ` : null
                                }
                                {element.content}
                                </div>
                                <p>{ element.type === "LEAVE" || element.type === "JOIN" ? null : `${date = new Date(element.date).toLocaleTimeString()}`}</p>
                                </div>
                            </ChatMessageItem>
                        </div>
                    ))
                }
            </div>

            <Sender>
                <TextArea id='message-input' placeholder="Message" value={message} onChange={(event) => {
                    setMessage(event.target.value);
                }}/>
                <Button onClick={sendMessage} color="#3E76BB" activeColor="#3E76BB" maxHeight={'60px'} minWidth={'105px'}>Send</Button>
            </Sender>
        </ChatStyled>
    );
}
