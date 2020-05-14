import styled from '@emotion/styled';

export default styled.div`
  color: #fff;
  display: flex;
  
  .user-menu__link {
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: #fff;
      
    .user-menu__avatar {
      height: 40px;
      width: 40px;
      object-fit: cover;
      margin-right: 10px;
      border-radius: 50%;
      border: 2px solid #fff;
    }
  }

  .user-menu__wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .user-menu__name {
    font-size: 15px;
  }

  .user-menu__role {
    font-size: 12px;
    color: #000;
  }
`;
