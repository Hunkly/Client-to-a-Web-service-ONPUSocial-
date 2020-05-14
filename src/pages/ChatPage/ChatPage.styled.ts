import styled from '@emotion/styled';

export default styled.div`
    color: #000;
    
    .chat-page__container{
        display: flex;
    }
    
    .chat-page__list{
        height: 600px;
        width: 200px;
        display: flex;
        flex-direction: column;
        background-color: #A2E0BE;
    }
    
    .chat-page__chat{
        max-height: 600px;
        width: 600px;
        background-color: #A2E0DA;
    }
    
    .tab {
      overflow: hidden;
      border: 1px solid #ccc;
      background-color: #f1f1f1;
    }
    
    
    .tab button {
      background-color: inherit;
      float: left;
      border: none;
      outline: none;
      cursor: pointer;
      padding: 14px 16px;
      transition: 0.3s;
      font-size: 17px;
    }
    
    
    .tab button:hover {
      background-color: #ddd;
    }
    
    
    .tab button.active {
      background-color: #ccc;
    }
    
    
    .tabcontent {
      padding: 6px 12px;
      border: 1px solid #ccc;
      border-top: none;
    }
    
    .tablinks{
        width: 100%;
    }
`
