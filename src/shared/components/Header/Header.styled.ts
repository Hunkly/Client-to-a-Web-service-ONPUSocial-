import styled from '@emotion/styled';

interface IStyledHeaderProps {
    user?: boolean | null
}

export default styled.div<IStyledHeaderProps>`
  .header__subheader{
  height: 70px;
  display: flex;
  justify-content: ${props => (props.user ? 'space-between' : 'center')};
  ${props => (props.user ? '' : 'margin: 0 auto;')}
  align-items: center;
  // padding-top: 5px;
  }
  
  .header {
  background-color: #61BB9D;
  width: 100%;
  box-shadow: 0px 0px 5px rgba(0,0,0,.8);
  position: relative;
  z-index: 1;
  }
`;
