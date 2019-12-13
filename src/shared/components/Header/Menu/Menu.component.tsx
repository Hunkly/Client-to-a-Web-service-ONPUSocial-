import React from 'react';
import StyledMenu from './Menu.styled';
import Store from '../../../../store/store';
import {logOut} from "../../../../store/currentSession/actions";
import axios from 'axios';

const Menu = () => (
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
                Store.dispatch(logOut());
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
                        console.log(res)
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

export default Menu;
