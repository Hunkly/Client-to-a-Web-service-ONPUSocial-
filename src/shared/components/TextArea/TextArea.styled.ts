import { styled } from '../../../styles/styled';

interface IStyledTextAreaProps{
    borderColor?: string;
}

export const LongText = styled.textarea<IStyledTextAreaProps>`
    width: 96.5%;
    height: 100%;
    margin-top: 5px;
    margin-right: 10px;
    border: 1px solid ${props =>( props.borderColor ? props.borderColor : "transparent")};
    border-radius: 5px;
    padding: 10px 10px 10px 10px;
    resize: none;
    display: flex;
    font-weight: 400;
    font-size: 13.3333px;
    font-family: Arial;
`;
