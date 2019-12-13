import React, {useEffect, useState} from 'react';
import StyledUserMenu from './UserMenu.styled';
import DefaultPhoto from '../../../../assets/img/DefaultPhoto.png';
import {CurrentSession} from "../../../../store/currentSession/actionTypes";
import {connect} from "react-redux";
import {saveState} from "../../../../store/localStorage";
import axios from "axios";

// interface IUserMenuProps {
//     isLogged: boolean,
//     fullName: UserName
// }

let list: CurrentSession = JSON.parse(localStorage.getItem('state') || '{}');
saveState(list);

const UserMenu = () => {
    const [login, setLogin] = useState(list.account.login);
    // const [password, setPassword] = useState(list.account.password);
    // const [logged, setLogged] = useState(list.isLogged);
    let one = true;

    useEffect(
        () => {
            list = JSON.parse(localStorage.getItem('state') || '{}');
            saveState(list);
            console.log('List', list);
                axios({
                    method: "get",
                    url: `http://localhost:9005/authuser`,
                    withCredentials: true,
                    headers: {
                        "Access-Control-Allow-Credentials": true,
                        "Access-Control-Allow-Origin": 'http://localhost:3000',
                        'Accept': 'application/json',
                        'Content-Type': 'x-www-form-urlencoded',
                        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    }
                })
                    .then(res => {
                        console.log(res)
                        setLogin(res.data.username);
                    })
                    .catch(error => {
                        console.log(error)
                    });
        }, [one]
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
                <div className="user-menu__name">{login}</div>
            </div>
        </StyledUserMenu>
    );
};

function mapStateToProps(state: CurrentSession){
    console.log('Session', state);
    return {
        isLogged: state.isLogged,
        account: {
            login: state.account.login,
            password: state.account.password
        }
    }
}

export default connect(mapStateToProps)(UserMenu)