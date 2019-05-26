import React from 'react';
import StyledHeader from './Header.styled';
import UserMenu from './UserMenu';
import Container from '../Container';
import Logo from './Logo';
import Menu from './Menu';

function Header() {
    return (
        <StyledHeader>
            <div className = "header">
                <Container>
                    <div className = "header__subheader">
                        <UserMenu/>
                        <Logo/>
                        <Menu/>
                    </div>
                </Container>
            </div>
        </StyledHeader>
    );
}

export default Header;