import React from 'react';
import StyledButton from './Button.styled';

interface IButtonProps {
    children: React.ReactNode;
    color?: string;
    activeColor?: string;
    type?: 'button' | 'reset' | 'submit';
    onClick?: (event: any) => void;
}

export default function Button({ type, activeColor, color, children, onClick }: IButtonProps) {
    return (
        <StyledButton type={type} color={color} activeColor={activeColor} onClick={onClick}>
            {children}
        </StyledButton>
    )};