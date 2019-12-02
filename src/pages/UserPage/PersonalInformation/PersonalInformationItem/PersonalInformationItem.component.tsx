import React from 'react';
import StyledBasicInfoItem from './PersonalInformationItem.styled';

interface IBasicInfoProps {
    title: string;
    multiline?: boolean;
    children: React.ReactNode;
}

export default class BasicInfoItem extends React.PureComponent<
    IBasicInfoProps
    > {
    public static defaultProps = {
        multiline: false
    };

    public render() {
        return (
            <StyledBasicInfoItem multiline={this.props.multiline}>
                <div className="basic-info-item__title">{this.props.title}:</div>
                <div className="basic-info-item__text">{this.props.children}</div>
            </StyledBasicInfoItem>
        );
    }
}
