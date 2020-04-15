import React, {useEffect, useState} from 'react';
import StyledUserMenu from './UserMenu.styled';
import DefaultPhoto from '../../../../assets/img/DefaultPhoto.png';
import axios from "axios";
import {ICurrent, LocalStorage} from "../../../../actions/current";
import {connect} from "react-redux";

interface IProps {
    isAuthenticated: boolean | null;
}
function UserMenu ({isAuthenticated}:IProps) {
    const auth: LocalStorage = JSON.parse(localStorage.getItem('state') || '{}');
    const [login, setLogin] = useState(auth.login);

    useEffect(
        () => {
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
                    console.log(res);
                    setLogin(res.data.username);
                })
                .catch(error => {
                    console.log(error)
                });
        }, [isAuthenticated]
    );

    return (
        <StyledUserMenu>
            <a className="user-menu__link" href={`/users/${login}`}>
                <img
                    className="user-menu__avatar"
                    src={DefaultPhoto}
                    alt="user"
                />
                <div className="user-menu__wrapper">
                    <div className="user-menu__name">{login}</div>
                </div>
            </a>
        </StyledUserMenu>
    );
};

const mapStateToProps = (state: ICurrent) => ({
    isAuthenticated: state.isAuthenticated
});

export default connect(
    mapStateToProps,
    {},
)(UserMenu);
