import React from 'react';
import StyledPublications from './Publications.styled';
import UserPost from "../../../shared/models/Post";
import PageLabel from "../../../shared/components/PageLabel/PageLabel.component";
import PublicationItem from "../../../shared/components/PublicationItem";


interface IPublicationsProps {
    posts: UserPost[];
}

export default function PublicationsComponent({posts}:IPublicationsProps){
    if (!posts) {
        return (
            <StyledPublications>
                <PageLabel> Publications </PageLabel>
                <div>Loading...</div>
            </StyledPublications>
        );
    }
    return (
        <StyledPublications>
            <PageLabel> Publications </PageLabel>
            {posts ? posts.map((post: UserPost) => (
                <PublicationItem post={post} key={post.id}/>)) : null}
        </StyledPublications>
    );
};
