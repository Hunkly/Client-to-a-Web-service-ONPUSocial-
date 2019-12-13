import styled from '@emotion/styled';

export default styled.div`
   color: #000;
   padding-left: 20px;
   padding-right: 20px;
   margin-bottom: 15px;
   
   p{
        font-weight: 100;
   }
   
   .publication-item__author{
        display: flex;
        align-items: center;
   }
   
   .publication-item__avatar {
        img{
      width: 40px;
      height: 40px;
      background-color: #b9b9b9;
      border-radius: 50%;}
   }
   .publication-item__label {
    padding-left: 15px;
    font-weight: 500;
  }
  
  .publication-item__picture {
      width: 700px;
      height: 200px;
      background-color: #b9b9b9;
      border-radius: 15px;
      margin-top: 10px;
   }
   
  .publication-item__date{
    padding-top: 5px;
    display: flex;
    justify-content: flex-end;
    font-size: 14px;
    font-style: italic;
  }
  
  .publication-item__container{
    display: flex;
    justify-content: space-between;
    //align-items: center;
  }
  
  .publication-item__delete-menu{
    img{
        margin-top: 20px;
        height: 15px;
    }
  }
  
  h3,p{
  margin: 0;
  margin-top: 10px;
  }
 
`;