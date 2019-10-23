import StyledHeadLine from './HeadLine.styled';
import React from 'react';

interface IHeadLineProps {
    children: React.ReactNode;
    appendComponent?: React.ReactNode;
}

const defaultProps: IHeadLineProps = {
    appendComponent: null,
    children: null
};

export default function HeadLine({
                                     children,
                                     appendComponent
                                 }: IHeadLineProps) {
    return (
        <StyledHeadLine>
            <h3 className="headline__label">{children}</h3>
            {appendComponent}
        </StyledHeadLine>
    );
}
HeadLine.defaultProps = defaultProps;
