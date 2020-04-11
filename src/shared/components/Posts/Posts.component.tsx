import React from 'react';
import StyledPublications from './Posts.styled';
import UserPost from "../../models/Post";
import PageLabel from "../PageLabel/PageLabel.component";
import PostItem from "./PostItem";
import NewPublication from './NewPost';
import UserModel from '../../models/User';

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
                        return <div ref={lastPostElement} key={post.id}><PostItem toggleChange={toggleChange} post={post} key={post.id}/></div>
                    } else {
                        return <PostItem toggleChange={toggleChange} post={post} key={post.id}/>
                    }
                })
                : null}
                <div>{loading && 'Loading...'}</div>
                <div>{error && 'Error...'}</div>
            </div>
        </StyledPublications>
    );
};
