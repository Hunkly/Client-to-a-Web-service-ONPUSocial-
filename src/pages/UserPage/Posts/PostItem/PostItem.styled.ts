import styled from '@emotion/styled';

export default styled.div`
   color: #000;
   padding: 20px;
   margin-bottom: 15px;
   background-color: #FCFCFC;
   
   
   p{
        font-weight: 100;
   }
   
   .post-item__author{
        display: flex;
        align-items: center;
   }
   
   .post-item__avatar {
        img{
      width: 40px;
      height: 40px;
      background-color: #b9b9b9;
      border-radius: 50%;}
   }
   .post-item__label {
    padding-left: 15px;
    font-weight: 500;
  }
  
  .post-item__picture {
      width: 700px;
      height: 200px;
      background-color: #b9b9b9;
      border-radius: 15px;
      margin-top: 10px;
   }
   
  .post-item__date{
    padding-top: 5px;
    display: flex;
    justify-content: flex-end;
    font-size: 14px;
    font-style: italic;
    // padding-bottom: 15px;
    // border-bottom: 0.1px solid #BDBDBD;
  }
  
  .post-item__container{
    display: flex;
    justify-content: space-between;
    //align-items: center;
  }
  
  .post-item__delete-menu{
    img{
        //margin-top: 20px;
        height: 15px;
    }
  }
  
  h3,p{
  margin: 0;
  margin-top: 10px;
  }
 
`;
