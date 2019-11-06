import styled from '@emotion/styled'

export default styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;
    width: 365px;
    height: 600px;
    border-radius: 5px;
    background-color: #61BB9D;
    
    .registration-page__row{
        display: flex;
        justify-content: space-between;
    }
    
    .registration-page__element{
        display: flex;
        flex-direction: column;
        margin: 5px;
    }
    
    input{
        padding-left: 10px;
        height: 30px;
        border-radius: 5px;
        border: none;
        margin-top: 5px;
    }
    
    button{
        //display: none;
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