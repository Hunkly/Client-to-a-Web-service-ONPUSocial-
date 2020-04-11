import React from 'react';
import StyledRegistrationPage from './RegistrationPage.styled';
import RegistrationWindow from "../../shared/components/RegistrationWindow";

export default function RegistrationPage(){
    return (
        <StyledRegistrationPage>
            <div className="registration-page__window">
                <RegistrationWindow/>
            </div>
        </StyledRegistrationPage>
    );
}
