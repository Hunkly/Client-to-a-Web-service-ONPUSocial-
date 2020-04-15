import styled from '@emotion/styled';

export default styled.div`
    display: flex;
    margin: 0;
   color: #000;

  .basic-info__avatar {
    width: 150px;
    height: 150px;
    background-color: #7c7c7c;
    border-radius: 50%;
  }
  
  // .basic-info__left-container {
  //   margin-right: 50px;
  //   display: flex;
  //   align-items: flex-start;
  //   flex-direction: column;
  // }
  
  .basic-info__container {
    margin-top: 10px;
    // box-shadow: 0 0 4px rgba(0,0,0,0.5);
    // background-color: #fff;
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    margin-bottom: 10px;
  }
  
  
  .basic-info__about{
      padding-bottom: 15px;
      padding-left: 20px;
  }
  
`;
