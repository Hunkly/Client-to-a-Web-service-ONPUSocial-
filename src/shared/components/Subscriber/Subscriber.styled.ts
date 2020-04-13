import styled from '@emotion/styled';

interface IStyledBasicInfoItemProps {
    multiline?: boolean;
}

export default styled.div<IStyledBasicInfoItemProps>`
  color: #000;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 15px;
  padding-bottom: 20px;

  .colleague-item__avatar {
    img{
        width: 50px;
        height: 50px;
        background-color: #9f9f9f;
        border-radius: 50%;
    }
  }
  
  a {
    display: flex;
    align-items: center;
  }

  .colleague-item__label {
    padding-left: 15px;
    font-weight: 300;
  }
`;
