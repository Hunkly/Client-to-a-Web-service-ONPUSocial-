import styled from '@emotion/styled';

export default styled.div`
    color: #000;
    height: 600px;
    display: flex;
    align-items: center; 
    justify-content: center;
    
    
    .greeting-page__title{
    font-size: 60px;
    font-weight: 600;
    }
    
    .greeting-page__link{
    font-size: 40px
    color: #000;
    text-decoration: none;
        :hover {
          color: violet;
        }
    }
    
    .greeting-page__link-active{
    color: #000;
    border-bottom: 1px solid #000;
    }
`;