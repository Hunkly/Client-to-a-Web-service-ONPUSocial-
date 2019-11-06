import React, {useEffect} from 'react';
import StyledUserMenu from './UserMenu.styled';
import DefaultPhoto from '../../../../assets/img/DefaultPhoto.png';
import {CurrentSession} from "../../../../store/actionTypes";
import {connect} from "react-redux";
import {saveState} from "../../../../store/localStorage";

// interface IUserMenuProps {
//     isLogged: boolean,
//     fullName: UserName
// }

let list: CurrentSession = JSON.parse(localStorage.getItem('state') || '{}');
saveState(list);

const UserMenu = () => {

    useEffect(
        () => {
            list = JSON.parse(localStorage.getItem('state') || '{}');
            saveState(list);
            console.log('List', list);
        }
    );

    return (
        <StyledUserMenu>
            <a className="user-menu__link" href="/">
                <img
                    className="user-menu__avatar"
                    src={DefaultPhoto}
                    alt="user"
                />
            </a>
            <div className="user-menu__wrapper">
                <div className="user-menu__name">{list.fullName.firstName}</div>
            </div>
        </StyledUserMenu>
    );
};

function mapStateToProps(state: CurrentSession){
    console.log('Session', state);
    return {
        isLogged: state.isLogged,
        fullName: {
            firstName: state.fullName.firstName,
            lastName: state.fullName.lastName
        }
    }
}

export default connect(mapStateToProps)(UserMenu)