import styled from '@emotion/styled';

interface IStyledLogoProps{
    user?: boolean
}

export default styled.div<IStyledLogoProps>`
    ${props => (props.user ? 'position: relative; right: -75px;' : '')}
    .logo__link {
    text-decoration: none;
    .logo__image {
      height: 75px;  
    }
  }  
`;
