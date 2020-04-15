import React from 'react';
import StyledNewsPage from './NewsPage.styled';
// import axios from "axios";
// import UserPost from "../../shared/models/Post";
// import PostItem from "../../shared/components/Posts/PostItem/PostItem.component";
import {PostsContainer} from "../../shared/components/Posts/Posts.container";
import HeadLine from "../../shared/components/HeadLine";

export default function NewsPage(){
    // const [posts, setPosts] = useState([]);
    //
    // useEffect(() => {
    //     axios({
    //         method: 'get',
    //         url: `http://localhost:9005/posts`,
    //         withCredentials: true,
    //         headers: {
    //             "Access-Control-Allow-Credentials": true,
    //             "Access-Control-Allow-Origin": 'http://localhost:3000',
    //             'Accept': 'application/json',
    //             'Content-Type': 'x-www-form-urlencoded',
    //             'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    //         }
    //     })
    //         .then(res => {
    //             console.log('All posts', res.data);
    //             setPosts(res.data.content);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    // }, [0]);

    return (
        <StyledNewsPage>
            <div className="news-page__window">
                <div className='title'>Новостная лента</div>
                <p>О чём говорят другие пользователи?</p>
                <div className="post-container">
                    <PostsContainer viewMode='news'/>
                </div>

                {/*{posts ? posts.map((post: UserPost, index: number) => {*/}
                {/*        if (posts.length === index + 1) {*/}
                {/*            // @ts-ignore*/}
                {/*            return <div ref={lastPostElement} key={post.id}><PostItem toggleChange={toggleChange} post={post} key={post.id} userID={user.id}/></div>*/}
                {/*        } else {*/}
                {/*            return <PostItem toggleChange={toggleChange} post={post} key={post.id} userID={user.id}/>*/}
                {/*        }*/}
                {/*    })*/}
                {/*    : null}*/}
            </div>
        </StyledNewsPage>
    );
}
