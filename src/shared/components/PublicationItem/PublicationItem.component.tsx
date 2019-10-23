import React from 'react';
import StyledPublicationItem from './PublicationItem.styled';

interface IPublicationItemProps {
    name_post: string,
    content: string,
    user: string,
    date: number;
}

export default class PublicationItem extends React.PureComponent<IPublicationItemProps,{}> {

    public render() {
        return (
            <StyledPublicationItem>
                <div className="publication-item__author">
                    <div className="publication-item__avatar"/>
                    <div className="publication-item__label">{this.props.user}</div>
                </div>
                <h3>{this.props.name_post}</h3>
                <p>{this.props.content} </p>
                <div className="publication-item__picture"/>
                <div className="publication-item__date">Date: {this.props.date}</div>
            </StyledPublicationItem>
        );
    }
}
