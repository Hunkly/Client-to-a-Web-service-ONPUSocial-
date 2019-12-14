import React, {useRef, useState, useCallback} from 'react';
import StyledPublications from './Publications.styled';
import UserPost from "../../../shared/models/Post";
import PageLabel from "../../../shared/components/PageLabel/PageLabel.component";
import PublicationItem from "./PublicationItem";
import NewPublication from './NewPublication/index';
import InfiniteScroll from 'react-infinite-scroller';
import IUser from "../../../shared/models/User";
import UserModel from '../../../shared/models/User';
import PublicationsContainer from "./Publications.container";


interface IPublicationsProps {
    user: UserModel;
    // loadPosts?: ((page: number) => void ) | any
   // loadChange: ((value: boolean) => void ) | any;
   // posts?: UserPost[] | any;
   // userId: number;
}

interface InfiniteLoading{
    newPosts: [],
    hasMore: boolean,
    loading: boolean,
    error: boolean
}
export default function PublicationsComponent({user}:IPublicationsProps){
    const [pageNumber, setPageNumber] = useState(1);
    const {
        posts,
        hasMore,
        loading,
        error,
        toggleChange
    }: any = PublicationsContainer(pageNumber);
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
                if(pageNumber !== 0){
                    setPageNumber(prevPageNumber => prevPageNumber - 1)
                } else { setPageNumber(0); }
            }
        })
        //@ts-ignore
        if (node) observer.current.observe(node)
    }, [loading, hasMore]);


    // if (!newPosts) {
    //     return (
    //         <StyledPublications>
    //             <PageLabel> Publications </PageLabel>
    //             <div>Loading...</div>
    //         </StyledPublications>
    //     );
    // }
    //
    // function loadMore(){
    //     console.log('pageNumber: ', pageNumber);
    //     loadPosts(pageNumber);
    //     pageNumber = pageNumber + 1;
    //
    //
    // }
    //
    //  let pageNumber = 0;





    return (
        <StyledPublications>
            <div className="publications__label">
                <PageLabel> Publications </PageLabel>
            </div>
            <NewPublication toggleChange={toggleChange} userId={user.id}/>
            <div className="publications__container">
                    {posts ? posts.slice(0).reverse().map((post: UserPost, index: number) => {
                            if (posts.length === index + 1) {
                               // @ts-ignore
                                return <div ref={lastPostElement}><PublicationItem toggleChange={toggleChange}  post={post} key={post}/></div>
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
