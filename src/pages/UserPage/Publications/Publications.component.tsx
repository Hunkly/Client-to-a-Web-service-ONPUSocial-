import React from 'react';
import StyledPublications from './Publications.styled';
import UserPost from "../../../shared/models/Post";
import PageLabel from "../../../shared/components/PageLabel/PageLabel.component";
import PublicationItem from "./PublicationItem";
import NewPublication from './NewPublication/index';


interface IPublicationsProps {
    loadChange: (value: boolean) => void;
    posts: UserPost[];
    userId: number;
}

export default function PublicationsComponent({loadChange, posts, userId}:IPublicationsProps){
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
            <div className="publications__label">
                <PageLabel> Publications </PageLabel>
            </div>
            <NewPublication loadChange={loadChange} userId={userId}/>
            <div className="publications__container">
                {posts ? posts.map((post: UserPost) => (
                    <PublicationItem loadChange={loadChange} post={post} key={post.id}/>)) : null}
            </div>
        </StyledPublications>
    );
};
