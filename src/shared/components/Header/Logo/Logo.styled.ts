import styled from '@emotion/styled';

interface IStyledLogoProps{
    user?: boolean
}

export default styled.div<IStyledLogoProps>`
    position: relative;
    top: -15px;
    ${props => (props.user ? 'position: relative; right: -75px;' : '')}
    .logo__link {
        text-decoration: none;
        font-size: 50px;
        font-weight: 450;
        color: #fff;
        
    .logo-container{
        height: 55px;
    }
    
    .logo{
      height: 40px; 
    }
    
    p{
        font-size: 15px;
        margin: 15px 0 0 5px;
        letter-spacing: 16px;
    }
  }  
`;
