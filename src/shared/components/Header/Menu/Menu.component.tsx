import React from 'react';
import {NavLink, BrowserRouter} from 'react-router-dom';
import StyledMenu from './Menu.styled';

const Menu = () => (
  <StyledMenu>
      <BrowserRouter>
        <NavLink
          exact={true}
          to="/"
          className="menu-link"
          activeClassName="menu-link--active"
        >
          Home
        </NavLink>
        <NavLink
          to="/news"
          className="menu-link"
          activeClassName="menu-link--active"
        >
          Settings
        </NavLink>
        <NavLink
          to="/about-us"
          className="menu-link"
          activeClassName="menu-link--active"
        >
          Log out
        </NavLink>
      </BrowserRouter>
  </StyledMenu>
);

export default Menu;
