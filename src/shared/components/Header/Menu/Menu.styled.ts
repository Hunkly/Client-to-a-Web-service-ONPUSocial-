import styled from '@emotion/styled';

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .menu-link {
    font-size: 15px
    color: #000;
    text-decoration: none;
    margin-right: 30px;
    :hover {
      color: #000;
    }
  }
  .menu-link--active {
    color: #000;
    border-bottom: 1px solid #000;
  }
`;

export default StyledMenu;
