import React from 'react';
import StyledButton from '../Button/Button.styled';

interface IButtonProps {
    children: string;
}

export default function Button({ children }: IButtonProps) {
    return (
        <StyledButton /* onClick={ this.handleCancelClick }*/>
            {children}
        </StyledButton>
    )};