import styled from '@emotion/styled';

export default styled.div`
    color: #000;
    height: 100%;
    
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    
    .Chat__box{
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        overflow: scroll;
    }
    
    .title {
        font-weight: 300;
        margin-top: 20px;
        font-size: 48px;
        margin-left: 5px;
    }
    
    .Chat__message-item{
        background-color: #EDCDC6;
        width: 600px;
        padding: 15px;
        margin: 15px;
        display: flex;
        align-items: center;
        border-radius: 5px;
    }
    
    .Chat__message-item__join {
        text-align: center;
        font-style: italic;
        color: blue;
        margin: 0 auto;
        display: flex;
        justify-content: center;
    }
    
    .Chat__message-item__left {
        text-align: center;
        font-style: italic;
        color: red;
        margin: 0 auto;
        display: flex;
        justify-content: center;
    }
    
    .Chat__send-message{
        height: 140px;
        width: 100%;
        display: flex;
        align-items: center;
        
        #message-input {
            max-height: 40px;
            width: 90%;
        }
    }
    
    .Chat__message-item__message {
        width: 80%;
     
    }
    
    .Chat__user-box{
        display: flex;
        margin-right: 15px;
    }
    
    .Chat__avatar {
      height: 40px;
      width: 40px;
      object-fit: cover;
      margin: auto 0;
      margin-right: 10px;
      border-radius: 50%;
      border: 2px solid #fff;
    }
`
