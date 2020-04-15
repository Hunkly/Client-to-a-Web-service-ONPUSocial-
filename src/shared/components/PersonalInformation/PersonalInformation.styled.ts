import styled from '@emotion/styled';

export default styled.div`
    display: flex;
    margin: 0;
    color: #000;
    
    .personal-info__box {
        width: 100%;
        
        input, select {
            padding-left: 10px;
            height: 30px;
            border-radius: 5px;
            border: 1px solid #61BB9D;
            margin-top: 5px;
        }
        
        .headline-input{
            padding-left: 15px;
            width: 100%;
            font-weight: 50;
        }
    }
  
    .personal-info__container {
        margin-top: 15px;
        margin-bottom: 10px;
    }
  
  
    .personal-info__about{
        padding-bottom: 15px;
        padding-left: 20px;    
    }
  
`;
