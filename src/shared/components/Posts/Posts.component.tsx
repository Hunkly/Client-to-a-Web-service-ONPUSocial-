import React from 'react';
import StyledPublications from './Posts.styled';
import UserPost from "../../models/Post";
import PageLabel from "../PageLabel/PageLabel.component";
import PostItem from "./PostItem";
import NewPublication from './NewPost';
import IUser from "../../models/User";

interface IPublicationsProps {
    viewMode: 'news' | 'profile' | 'otherProfile',
    posts: [],
    currUser: IUser,
    hasMore: boolean,
    loading: boolean,
    error: boolean,
    lastPostElement: (node:any)=>void,
    toggleChange: () => void
}

export default function PostsComponent({viewMode , currUser, posts, loading, error, lastPostElement, toggleChange }:IPublicationsProps){

    return (
        <StyledPublications>
            <div className="posts__label">
                <PageLabel> Publications </PageLabel>
            </div>
            {
                viewMode === 'otherProfile' ? null : <NewPublication userId={currUser.id} toggleChange={toggleChange}/>
            }
            <div className="posts__container">
                {posts ? posts.map((post: UserPost, index: number) => {
                    let mode: 'profile' | 'otherProfile' = 'otherProfile';
                    if(post.user_idfield === currUser.id) {
                        mode = 'profile'
                    } else {
                        mode = 'otherProfile'
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
