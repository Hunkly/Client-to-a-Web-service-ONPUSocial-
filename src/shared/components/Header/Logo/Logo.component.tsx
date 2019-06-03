import React from 'react';
import StyledLogo from './Logo.styled';
import LogoIcon from '../../../../assets/img/logo.png';

const Logo = () => (
  <StyledLogo>
      <a className="logo__link" href="/">
          <img
              className="logo__image"
              src={LogoIcon}
              alt="logo"
          />
      </a>
  </StyledLogo>
);

export default Logo;
