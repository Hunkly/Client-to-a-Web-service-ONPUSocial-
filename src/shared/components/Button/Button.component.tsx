import React from 'react';
import StyledButton from './Button.styled';

interface IButtonProps {
    children: React.ReactNode;
    color?: string;
    activeColor?: string;
    type?: 'button' | 'reset' | 'submit';
}

export default function Button({ type, activeColor, color, children }: IButtonProps) {
    return (
        <StyledButton type={type} color={color} activeColor={activeColor}>
            {children}
        </StyledButton>
    )};