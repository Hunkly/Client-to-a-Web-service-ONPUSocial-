import React from 'react';
import StyledPublications from './Posts.styled';
import UserPost from "../../models/Post";
import PageLabel from "../PageLabel/PageLabel.component";
import PostItem from "./PostItem";
import NewPublication from './NewPost';
import IUser from "../../models/User";

interface IPublicationsProps {
    posts: [],
    currUser: IUser,
    hasMore: boolean,
    loading: boolean,
    error: boolean,
    lastPostElement: (node:any)=>void,
    toggleChange: () => void
}

export default function PostsComponent({currUser, posts, loading, error, lastPostElement, toggleChange }:IPublicationsProps){

    return (
        <StyledPublications>
            <div className="posts__label">
                <PageLabel> Publications </PageLabel>
            </div>
            <NewPublication userId={currUser.id} toggleChange={toggleChange}/>
            <div className="posts__container">
                {posts ? posts.map((post: UserPost, index: number) => {
                    let mode: 'own' | 'notOwn' = 'notOwn';
                    if(post.user_idfield === currUser.id) {
                        mode = 'own'
                    } else {
                        mode = 'notOwn'
                    }
                    if (posts.length === index + 1) {
                       // @ts-ignore
                        return <div ref={lastPostElement} key={post.id}><PostItem viewMode={mode} toggleChange={toggleChange} post={post} key={post.id}/></div>
                    } else {
                        return <PostItem viewMode={mode} toggleChange={toggleChange} post={post} key={post.id}/>
                    }
                })
                : null}
                <div>{loading && 'Loading...'}</div>
                <div>{error && 'Error...'}</div>
            </div>
        </StyledPublications>
    );
};
