import React from 'react';
import GerttinPageStyled from './GreetingPage.styled';
import {NavLink, BrowserRouter} from 'react-router-dom';


export default function GreetingPage(){
    return(
        <GerttinPageStyled>
            <div className = "greeting-page__title">WELCOME TO ONPU NETWORK </div>
              <a className="greeting-page__link" href="/users/1">Let's go</a>
        </GerttinPageStyled>
    )
};