import styled from '@emotion/styled';

interface IStyledLogoProps{
    user?: boolean
}

export default styled.div<IStyledLogoProps>`
    ${props => (props.user ? 'position: relative; right: -75px;' : '')}
    .logo__link {
        text-decoration: none;
        font-size: 50px;
        font-weight: 450;
        color: #fff;
        
    .logo__image {
       
      height: 75px;  
    }
  }  
`;
