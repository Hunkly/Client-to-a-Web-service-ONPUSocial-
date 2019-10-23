import styled from '@emotion/styled'

export default styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;
    width: 320px;
    height: 200px;
    border-radius: 5px;
    background-color: #CCCBCB;
    
    .authorization-page__button-container{
        display: flex;
        justify-content: space-between;
    }
    
    .authorization-page__container{
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        font-size: 20px;
    }
    
    input{
        padding-left: 10px;
        height: 30px;
        border-radius: 5px;
        border: none;
        margin-top: 5px;
    }

`