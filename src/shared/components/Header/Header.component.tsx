import React, {useEffect} from 'react';
import StyledHeader from './Header.styled';
import UserMenu from './UserMenu';
import Container from '../Container';
import Logo from './Logo';
import Menu from './Menu';
import {CurrentSession} from "../../../store/actionTypes";
import {connect} from "react-redux";
import {saveState} from "../../../store/localStorage";

// interface IHeaderProps{
//     isLogged: boolean,
//     fullName: UserName
// }

let list: CurrentSession = JSON.parse(localStorage.getItem('state') || '{}');
saveState(list);

function Header() {
    useEffect(
        () => {
            list = JSON.parse(localStorage.getItem('state') || '{}');
            saveState(list);
            console.log('Header -> localStorage: ', list);
        }
    );

    return (
        <StyledHeader user={list.isLogged}>
            <div className = "header">
                <Container>
                    <div className = "header__subheader">
                        {list.isLogged ? <UserMenu/> : null}
                        <Logo user={list.isLogged}/>
                        {list.isLogged ? <Menu/> : null}
                    </div>
                </Container>
            </div>
        </StyledHeader>
    );
}

function mapStateToProps(state: CurrentSession){
    return {
        isLogged: state.isLogged,
        fullName: {
            firstName: state.fullName.firstName,
            lastName: state.fullName.lastName
        }
    }
}

export default connect(mapStateToProps)(Header)