import styled from '@emotion/styled';

interface IContainerProps {
    bgColor?: string;
}

export default styled.div<IContainerProps>`
  width: 100%;
  // padding: 0 30px;
  max-width: 1040px;
  margin: 0 auto;
  color: transparent;
  background-color: ${props => (props.bgColor ? `${props.bgColor}` : '#fff')};

`;
