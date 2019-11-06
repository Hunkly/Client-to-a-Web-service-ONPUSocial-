import React from 'react';
import StyledPublications from './Publications.styled';
import UserPost from "../../../shared/models/Post";


interface IPublicationsProps {
    posts: UserPost | null;
}

export default class PublicationsComponent extends React.PureComponent<IPublicationsProps> {
    public render() {
        if (!this.props.posts) {
            return (
                <div>Loading...</div>
            );
        }
        return (
            <StyledPublications>
                {this.props.posts}
            </StyledPublications>
        );
    }
}
