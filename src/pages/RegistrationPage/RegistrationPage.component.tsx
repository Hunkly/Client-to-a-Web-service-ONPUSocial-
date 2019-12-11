import React from 'react';
import StyledRegistrationPage from './RegistrationPage.styled';
import RegistrationWindow from "./RegistrationWindow";

export default function RegistrationPage(){
    return (
        <StyledRegistrationPage>
            <div className="registration-page__window">
                Registration
                <RegistrationWindow/>
            </div>
        </StyledRegistrationPage>
    );
}