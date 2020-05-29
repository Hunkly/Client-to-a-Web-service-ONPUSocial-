import styled from '@emotion/styled';

interface IStyledGreetingPageProps {
    active_color?: string;
}

export default styled.div<IStyledGreetingPageProps>`
    display: flex;
    justify-content: space-between;
    
    .greeting-page__container{
        color: #000;
        height: 400px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin-top: 100px;
    }
    
    .greeting-page__button-container{
        button{
            margin: 5px;
        }
    }
    
    .greeting-page__title{
        font-size: 30px;
        font-weight: 600;
    }
    
    .greeting-page__text{
        font-size: 20px;
        font-weight: 200;
        margin-bottom: 15px;
    }
    
    .greeting-page__link{
        margin-left: 40px;
        margin-right: 40px;
        margin-top: 10px;
        font-size: 20px;
        font-weight: 350;
        color: #000;
        text-decoration: none;
            :hover {
              color: ${props => (props.active_color ? props.active_color : 'blue')};;
            }
    }
    
    #greeting-page__red{
        :hover {
              color: red;
            }
    }
    
    #greeting-page__green{
        :hover {
              color: green;
            }
    }
    
    .greeting-page__link-active{
        color: #000;
        border-bottom: 1px solid #000;
    }
    
    .row-box{
        width: 100%;
        display: flex;
        flex-direction: row;
    }
`;
