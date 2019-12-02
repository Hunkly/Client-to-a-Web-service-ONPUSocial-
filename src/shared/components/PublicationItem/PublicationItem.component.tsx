import React from 'react';
import StyledPublicationItem from './PublicationItem.styled';
import UserPost from '../../models/Post'

interface IPublicationItemProps {
    post: UserPost;
}

export default class PublicationItem extends React.PureComponent<IPublicationItemProps,{}> {
    public date = new Date(this.props.post.date);
    public render() {
        return (
            <StyledPublicationItem>
                <div className="publication-item__author">
                    <div className="publication-item__avatar"/>
                    <div className="publication-item__label">{this.props.post.user}</div>
                </div>
                <h3>{this.props.post.name_post}</h3>
                <p>{this.props.post.content} </p>
                <div className="publication-item__picture"/>
                <div className="publication-item__date">Date: {this.date.toDateString()}</div>
            </StyledPublicationItem>
        );
    }
}
