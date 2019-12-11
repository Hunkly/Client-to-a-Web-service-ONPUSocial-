import React, { useState } from 'react';
import StyledAuthorizationPage from './AuthorizationPage.styled';
import AuthorizationWindow from "./AuthorizationWindow";

export default function AuthorizationPage(){


    return (
        <StyledAuthorizationPage>
            <div className="authorization-page__window">
            Authorization
            <AuthorizationWindow/>
            </div>
        </StyledAuthorizationPage>
    );
}