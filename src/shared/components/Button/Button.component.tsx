import React from 'react';
import StyledButton from './Button.styled';

interface IButtonProps {
    children: string;
    color?: string;
    activeColor?: string;
}

export default function Button({ activeColor, color, children }: IButtonProps) {
    return (
        <StyledButton color={color} activeColor={activeColor}>
            {children}
        </StyledButton>
    )};