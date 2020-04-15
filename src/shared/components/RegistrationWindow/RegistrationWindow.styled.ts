import styled from '@emotion/styled'

interface IStyledRegWindowProps{
    id?: string;
    isValid?: boolean;
}

export default styled.div<IStyledRegWindowProps>`
    display: flex;
    flex-direction: column;
    padding: 15px;
    width: 700px;
    border-radius: 5px;
    background-color: #61BB9D;
    color: #fff;
    font-weight: 600;
    margin-top: 100px;
    
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
        
        button{
            width: 100%;
        }
    }
    
    .row-box{
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 5px;
    }
    
    input, select{
        padding-left: 10px;
        height: 30px;
        border-radius: 5px;
        border: none;
        margin-top: 5px;
    }
    
    #${(props) => (props.id ? props.id : '1')} {
        background-color: ${(props) => (props.isValid ? '#fff' : '#FF7979')};
    }
    
    .registration-page__additional-text{
        color: #1C5C37;
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
    
    .dialog-box {
        width: 400px;
        height: 400px;
        padding: 20px;
    }
`
