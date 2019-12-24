import styled from '@emotion/styled';

export default styled.div`
    margin-top: 10px;
    margin-bottom: 10px;


    .post-comment__author{
        display: flex;
        align-items: center;
   }
   
   .post-comment__author-avatar {
        img{
      width: 30px;
      height: 30px;
      background-color: #b9b9b9;
      border-radius: 50%;}
   }
   
   .post-comment__author-label {
    padding-left: 15px;
    font-weight: 500;
  }
`