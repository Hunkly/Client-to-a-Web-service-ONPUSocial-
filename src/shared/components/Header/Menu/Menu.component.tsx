import React from 'react';
import StyledMenu from './Menu.styled';
import Store from '../../../../store/store';
import {logOut} from "../../../../store/currentSession/actions";

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
            }}
        >
          Log out
        </a>
  </StyledMenu>
);

export default Menu;
