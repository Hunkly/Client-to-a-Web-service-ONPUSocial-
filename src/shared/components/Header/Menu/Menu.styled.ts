import styled from '@emotion/styled';

const StyledMenu = styled.nav`
  width: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #fff;
  
  .menu-link {
    font-size: 17px;
    color: #fff;
    text-decoration: none;
    :hover {
      -webkit-transition: all 0.3s ease;
      -moz-transition: all 0.3s ease;
      -o-transition: all 0.3s ease;
      transition: all 0.3s ease;
      color: #000;
    }
  }
  .menu-link--active {
    color: #fff;
    border-bottom: 1px solid #000;
  }
`;

export default StyledMenu;
