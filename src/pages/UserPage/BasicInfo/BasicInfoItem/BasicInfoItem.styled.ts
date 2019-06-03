import styled from '@emotion/styled';

interface IStyledBasicInfoItemProps {
    multiline?: boolean;
}

export default styled.div<IStyledBasicInfoItemProps>`
  color: #000;
  display: flex;
  flex-direction: ${props => (props.multiline ? 'column' : 'row')};
  padding-bottom: 10px;
  padding-left: 20px;

  .basic-info-item__title {
    min-width: 75px;
  }

  .basic-info-item__text {
    ${props => (props.multiline ? 'padding-top: 20px' : 'margin-left: 60px')};
    font-weight: 300;
  }
`;
