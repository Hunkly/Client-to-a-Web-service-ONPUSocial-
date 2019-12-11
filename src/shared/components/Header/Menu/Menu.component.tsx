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
                axios
                    .get(`http://localhost:9005/logout`)
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
