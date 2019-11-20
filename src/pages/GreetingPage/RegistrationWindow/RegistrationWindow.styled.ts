import styled from '@emotion/styled'

interface IStyledRegWindowProps{
    id?: string;
    isValid?: boolean;
}

export default styled.div<IStyledRegWindowProps>`
    display: flex;
    flex-direction: column;
    padding: 15px;
    width: 365px;
    height: 600px;
    border-radius: 5px;
    background-color: #61BB9D;
    color: #fff;
    font-weight: 600;
    
    .registration-window__date-picker{
        border-radius: 5px;
        border: none;
        margin-top: 5px;
    }
    
    .registration-page__row{
        display: flex;
        justify-content: space-between;
    }
    
    .registration-page__element{
        display: flex;
        flex-direction: column;
        margin: 5px;
        width: 100%;
    }
    
    input{
        padding-left: 10px;
        height: 30px;
        border-radius: 5px;
        border: none;
        margin-top: 5px;
    }
    
    #${(props) => (props.id ? props.id : '1')} {
        border: ${(props) => (props.isValid ? 'none' : '1px solid')};
        border-color: ${(props) => (props.isValid ? 'black' : 'red')};
    }
    
    .registration-page__additional-text{
        color: red;
        font-weight: 350;
    }
    
    .registration-page__birthday-input{
        width: 45px;
    }
    
    .registration-page__element__container{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        width: 230px;
    }
    
    select{
        border-radius: 5px;
        height: 35px;
        margin-top: 3px;
    }
`