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
}

export default function PublicationsComponent({user}:IPublicationsProps){

    const [pageNumber, setPageNumber] = useState(0);

    const {
        posts,
        hasMore,
        loading,
        error,
        toggleChange
    }: any = LoadPosts(pageNumber, true);

    const observer = useRef();
    const lastPostElement = useCallback( node =>
    {
        console.log(node);
        if (loading) return;
        //@ts-ignore
        if (observer.current) observer.current.disconnect();
        //@ts-ignore
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                    setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        });
        //@ts-ignore
        if (node) observer.current.observe(node)
    }, [loading, hasMore]);

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
