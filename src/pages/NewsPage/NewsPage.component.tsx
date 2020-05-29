import React from 'react';
import StyledNewsPage from './NewsPage.styled';
import {PostsContainer} from "../../shared/components/Posts/Posts.container";

export default function NewsPage(){

    return (
        <StyledNewsPage>
            <div className="news-page__window">
                <div className='title'>Новостная лента</div>
                <p>О чём говорят другие пользователи?</p>
                <div className="post-container">
                    <PostsContainer viewMode='news'/>
                </div>
            </div>
        </StyledNewsPage>
    );
}
