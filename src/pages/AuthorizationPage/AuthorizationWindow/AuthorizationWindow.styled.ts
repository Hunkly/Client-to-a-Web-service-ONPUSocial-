import styled from '@emotion/styled'

interface IStyledAuthWindowProps{
    id?: string;
    isValid?: boolean;
    isErr?: boolean;
}

export default styled.div<IStyledAuthWindowProps>`
    display: flex;
    flex-direction: column;
    padding: 15px;
    width: 100%;
    //height: ${(props) => (!props.isErr ? props.isValid ? '200px' : '220px' : '220px')};
    border-radius: 5px;
    background-color: #61BB9D;
    color: #fff;
    
    .authorization-page__button-container{
        display: flex;
        justify-content: space-between;
        margin-top: 15px;
        width: 100%;
        
        button{
            margin: 5px;
            width: 100%;
        }
    }
    
    #${(props) => (props.id ? props.id : '1')} {
        border: ${(props) => (props.isValid ? 'none' : '1px solid')};
        border-color: ${(props) => (props.isValid ? 'black' : 'red')};
    }
    
    .authorization-page__container{
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        font-size: 20px;
    }
    
    .auth-window__additional-text{
        font-size: 15px;
        color: red;
        font-weight: 350;
    }
    
    input{
        padding-left: 10px;
        height: 30px;
        border-radius: 5px;
        border: none;
        margin-top: 5px;
    }

`