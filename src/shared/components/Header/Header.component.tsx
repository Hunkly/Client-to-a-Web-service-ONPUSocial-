import React, {useEffect, useState} from 'react';
import StyledHeader from './Header.styled';
import UserMenu from './UserMenu';
import Container from '../Container';
import Logo from './Logo';
import Menu from './Menu';
import axios from "axios";
import {ICurrent} from "../../../actions/current";
import {connect} from "react-redux";

console.log('Компонент хэдэра');

interface IProps {
    isAuthenticated: boolean | null
}

function Header({isAuthenticated}: IProps) {
    let auth = JSON.parse(localStorage.getItem('state') || '{}');
    const [logged, setLogged] = useState(auth.authenticated);
    function LoggedChange(){
        console.log('Сработала функция LoggedChange');
        setLogged(!logged);
    }


    useEffect(
        () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            auth = JSON.parse(localStorage.getItem('state') || '{}');
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
                    setLogged(true);
                })
                .catch(error => {
                    console.log(error)
                    setLogged(false);
                });
        }, [isAuthenticated]
    );

    return (
        <StyledHeader user={logged}>
            <div className = "header">
                <Container>
                    <div className = "header__subheader">
                        {logged ? <UserMenu/> : null}
                        <Logo user={logged}/>
                        {logged ? <Menu onLoggedChange={LoggedChange}/> : null}
                    </div>
                </Container>
            </div>
        </StyledHeader>
    );
}
const mapStateToProps = (state: ICurrent) => ({
    isAuthenticated: state.isAuthenticated
});

export default connect(
    mapStateToProps,
    {},
)(Header);



