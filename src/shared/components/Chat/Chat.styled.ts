import styled from '@emotion/styled';

export const ChatStyled = styled.div`
    color: #000;
    width: 100%;
    height: 90vh;
    background-color: #A2E0DA;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    padding: 0 12px 6px 12px;
    
    .Chat__box{
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        overflow: scroll;
    }
    
    /* хром, сафари */
    .Chat__box::-webkit-scrollbar { width: 0; }
    
    /* ie 10+ */
    .Chat__box { -ms-overflow-style: none; }
    
    /* фф (свойство больше не работает, других способов тоже нет)*/
    .Chat__box { overflow: -moz-scrollbars-none; }
    
    .title {
        font-weight: 300;
        margin-top: 20px;
        font-size: 48px;
        margin-left: 5px;
    }
    
    .Chat__message-item{
        
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
        height: 80px;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 10px 12px 5px 12px;
        border-top: 1px solid #61BB9D;
        
        #message-input {
            max-height: 38px;
            width: 90%;
            margin-top: 0;
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
`;

interface IMessageItem {
    type?: string,
    addType?: boolean
}

export const ChatMessageItem = styled.div<IMessageItem>`
    border-bottom: 3px solid ${props =>(props.type === 'CHAT' ? props.addType ? 'orange' : 'blue' : props.type === 'JOIN' ? 'green' : 'red')};
    max-width: 400px;
    min-width: 200px;
    width: fit-content; 
    padding: 15px;
    margin: ${props =>(props.type === 'CHAT' ? props.addType ? '0 auto 0 0' :'0 0 0 auto' : '0 auto')};
    display: flex;
    align-items: center;
    justify-content: ${props =>( props.type === 'CHAT' ? props.addType ? 'flex-start' : 'flex-end': 'center')};
    
    p{
        margin: 0;
        font-style: italic;
        font-size: 12px;
    }
    
    .column{
        display: flex;
        flex-direction: column;
    }
`;

export const InfoMessageItem = styled.div<IMessageItem>`
    border-bottom: 3px solid ${props =>( props.type === 'JOIN' ? 'green' : 'red')};
    width: 600px;
    padding: 15px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    width: 80%;
`;



export const DateMessageItemBlock = styled.div`
    width: 150px;
    background-color: #61BB9D;
    margin: 10px auto;
    text-align: center;
    color: #fff;
    padding: 5px;
`;

export const Avatar = styled.img`
    height: 40px;
    width: 40px;
    object-fit: cover;
    margin: auto 0;
    margin-right: 10px;
    border-radius: 50%;
    border: 2px solid #fff;
`

export const Sender = styled.div`
    height: 80px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px 12px 5px 12px;
    border-top: 1px solid #61BB9D;
    
    #message-input {
        max-height: 38px;
        width: 90%;
        margin-top: 0;
    }
`;

export const Info = styled.div`
    padding: 12px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #61BB9D;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    
    p{
        margin: 0;
        font-style: italic;
        font-size: 12px;
    }
    
    .column{
        display: flex;
        flex-direction: column;
    }
    
    .flex-box{
        display: flex;
    }
    
    .icon{
        height: 25px;
        width: 25px;
        transition: 0.1s;
    }
    
    .icon:hover{
        fill: #61BB9D;
    }
`;
