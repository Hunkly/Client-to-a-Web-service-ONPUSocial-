import React from 'react';
import StyledAuthorizationPage from './AuthorizationPage.styled';
import AuthorizationWindow from "../../shared/components/AuthorizationWindow";

export default function AuthorizationPage(){


    return (
        <StyledAuthorizationPage>
            <div className="authorization-page__window">
                <AuthorizationWindow/>
            </div>
        </StyledAuthorizationPage>
    );
}
