import React from 'react';
import StyledMenu from './Menu.styled';
import axios from 'axios';
import {ICurrent, logOut} from "../../../../actions/current";
import {pushToAddress} from "../../../../pathHistory";
import {connect} from "react-redux";

interface IProps {
    onLoggedChange: () => void;
}

function Menu ({onLoggedChange}: IProps) {
return (
  <StyledMenu>
    <a
        href="/"
        className="menu-link"
    >
      Home
    </a>
    <a
        href="/news"
        className="menu-link"
    >
      News
    </a>
    <a
        href="/"
        className="menu-link"
        onClick={() => {
            axios({
                method: "get",
                url: `http://localhost:9005/logout`,
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
                logOut();
                onLoggedChange();
                pushToAddress('/');

            })
            .catch(error => {
                console.log(error)
            })
        }}
    >
      Log out
    </a>
  </StyledMenu>
    );
}

const mapStateToProps = (state: ICurrent) => ({
    isAuthenticated: state.isAuthenticated
});

export default connect(
    mapStateToProps,
    {},
)(Menu);
