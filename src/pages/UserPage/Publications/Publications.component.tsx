import React, {useRef, useState, useCallback} from 'react';
import StyledPublications from './Publications.styled';
import UserPost from "../../../shared/models/Post";
import PageLabel from "../../../shared/components/PageLabel/PageLabel.component";
import PublicationItem from "./PublicationItem";
import NewPublication from './NewPublication/index';
import UserModel from '../../../shared/models/User';
import { LoadPosts } from "./Publications.container";

interface IPublicationsProps {
    user: UserModel;
    posts: [],
    hasMore: boolean,
    loading: boolean,
    error: boolean,
    lastPostElement: (node:any)=>void,
    toggleChange: ()=>void
}

export default function PublicationsComponent({user, posts, loading, hasMore,error, lastPostElement, toggleChange }:IPublicationsProps){

    return (
        <StyledPublications>
            <div className="publications__label">
                <PageLabel> Publications </PageLabel>
            </div>
            <NewPublication toggleChange={toggleChange} userId={user.id}/>
            <div className="publications__container">
                {posts ? posts.map((post: UserPost, index: number) => {
                    if (posts.length === index + 1) {
                       // @ts-ignore
                        return <div ref={lastPostElement} key={post.id}><PublicationItem toggleChange={toggleChange} post={post} key={post.id}/></div>
                    } else {
                        return <PublicationItem toggleChange={toggleChange} post={post} key={post.id}/>
                    }
                })
                : null}
                <div>{loading && 'Loading...'}</div>
                <div>{error && 'Error...'}</div>
            </div>
        </StyledPublications>
    );
};
