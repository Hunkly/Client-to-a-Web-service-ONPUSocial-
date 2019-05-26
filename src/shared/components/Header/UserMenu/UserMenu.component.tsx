import React from 'react';
import StyledUserMenu from './UserMenu.styled';
import DefaultPhoto from '../../../../assets/img/DefaultPhoto.png';

const UserMenu = () => {
    return (
        <StyledUserMenu>
            <a className="user-menu__link" href="User.html">
                <img
                    className="user-menu__avatar"
                    src={DefaultPhoto}
                    alt="user-photo"
                />
            </a>
            <div className="user-menu__wrapper">
                <div className="user-menu__name">John</div>
            </div>
        </StyledUserMenu>
    );
};

export default UserMenu;