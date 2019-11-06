import styled from '@emotion/styled';

interface IStyledHeaderProps {
    user?: boolean
}

export default styled.div<IStyledHeaderProps>`
  .header__subheader{
  //background-color: #eaeaea;
  height: 100px;
  display: flex;
  justify-content: ${props => (props.user ? 'space-between' : 'center')};
  ${props => (props.user ? '' : 'margin: 0 auto;')}
  align-items: center;
  }
  
  .header {
  background-color: #61BB9D;
  width: 100%;
  }
`;
