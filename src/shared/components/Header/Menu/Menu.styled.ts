import styled from '@emotion/styled';

const StyledMenu = styled.nav`
  width: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #fff;
  
  .menu-link {
    font-size: 15px
    color: #fff;
    text-decoration: none;
    :hover {
      color: #000;
    }
  }
  .menu-link--active {
    color: #fff;
    border-bottom: 1px solid #000;
  }
`;

export default StyledMenu;
