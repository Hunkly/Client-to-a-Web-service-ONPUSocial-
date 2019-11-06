import styled from '@emotion/styled'

export default styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;
    width: 300px;
    height: 200px;
    border-radius: 5px;
    background-color: #61BB9D;
    color: #fff;
    
    .authorization-page__button-container{
        margin-top: 20px;
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