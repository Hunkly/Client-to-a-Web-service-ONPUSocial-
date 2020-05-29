import styled from '@emotion/styled';

export const ChatPageContainer = styled.div`
    color: #000;
    display: flex;
    
    .chat-page__button-container{
        display: flex;
        flex-direction: column; 
        
        button {
            margin-top: 15px;
            height: 50px
        }
    }
    
    .chat-page__container{
        display: flex;
        flex-direction: column;
        align-items: space-between;
        height: 90vh;
    }
`;

export const UserList = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    
    .row-box{
        display: flex;
        justify-content: space-between;
    }
`;

export const Avatar = styled.img`
    height: 50px;
      width: 50px;
      object-fit: cover;
      margin: auto 0;
      margin-right: 10px;
      border-radius: 50%;
      // border: 2px solid #fff;
`;

export const ChatList = styled.div`
    height: 100%;
    width: 350px;
    display: flex;
    flex-direction: column;
    //border: 1px solid #A2E0BE;
    
    button {
      background-color: inherit;
      float: left;
      border: none;
      outline: none;
      cursor: pointer;
      padding: 14px 16px;
      transition: 0.3s;
      font-size: 17px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 1px solid #A2E0BE;
    }
    
    button:hover {
      background-color: #A2E0BE;
    }
    
    button.active {
      background-color: #61BB9D;
    }
    
    .message{
        text-align: left;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        
        p{
            margin: 0;
            font-size: 13px;
        }
    }
`;
