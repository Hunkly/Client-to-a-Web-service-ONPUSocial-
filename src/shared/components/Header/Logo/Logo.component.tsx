import React from 'react';
import StyledLogo from './Logo.styled';

interface ILogoProps{
    user?: boolean
}

const Logo = ({user}:ILogoProps) => (
  <StyledLogo user={user}>
      <a className="logo__link" href="/">
          ONPU
      </a>
  </StyledLogo>
);

export default Logo;
