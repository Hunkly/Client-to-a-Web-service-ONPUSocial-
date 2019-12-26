import React from 'react';
import StyledPublications from './Posts.styled';
import UserPost from "../../../shared/models/Post";
import PageLabel from "../../../shared/components/PageLabel/PageLabel.component";
import PostItem from "./PostItem";
import NewPublication from './NewPost/index';
import UserModel from '../../../shared/models/User';

interface IPublicationsProps {
    user: UserModel;
    posts: [],
    hasMore: boolean,
    loading: boolean,
    error: boolean,
    lastPostElement: (node:any)=>void,
    toggleChange: () => void
}

export default function PostsComponent({user, posts, loading, error, lastPostElement, toggleChange }:IPublicationsProps){

    return (
        <StyledPublications>
            <div className="posts__label">
                <PageLabel> Publications </PageLabel>
            </div>
            <NewPublication toggleChange={toggleChange} userId={user.id}/>
            <div className="posts__container">
                {posts ? posts.map((post: UserPost, index: number) => {
                    if (posts.length === index + 1) {
                       // @ts-ignore
                        return <div ref={lastPostElement} key={post.id}><PostItem toggleChange={toggleChange} post={post} key={post.id} userID={user.id}/></div>
                    } else {
                        return <PostItem toggleChange={toggleChange} post={post} key={post.id} userID={user.id}/>
                    }
                })
                : null}
                <div>{loading && 'Loading...'}</div>
                <div>{error && 'Error...'}</div>
            </div>
        </StyledPublications>
    );
};
