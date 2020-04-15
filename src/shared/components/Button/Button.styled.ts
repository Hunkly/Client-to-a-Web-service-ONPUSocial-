import styled from '@emotion/styled';

interface IStyledButtonProps{
   color?: string;
   activeColor?: string;
}

export default styled.button<IStyledButtonProps>`
    font-weight: 700;
    background-color: ${props =>( props.color ? props.color : "#e9e9e9")};
    color: #fff;
    border: none;
    max-height: 60px;
    border-radius: 5px;
    min-width: 150px;
    padding: 10px 30px 10px 30px;
    //margin-top: 20px;
    :hover {
      -webkit-transition: all 0.3s ease;
      -moz-transition: all 0.3s ease;
      -o-transition: all 0.3s ease;
      transition: all 0.3s ease;
      background-color: ${props =>( props.activeColor ? props.activeColor : "#b9b9b9")};
    }
   `;
