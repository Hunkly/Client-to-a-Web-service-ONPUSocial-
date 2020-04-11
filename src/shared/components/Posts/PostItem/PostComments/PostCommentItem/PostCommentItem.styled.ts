import styled from '@emotion/styled';

export default styled.div`
    margin-top: 15px;
    margin-bottom: 15px;
    padding: 10px;
    background-color: #EDEDED;
    
    .post-comment__container{
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    
    .post-comment__author{
        display: flex;
        align-items: center;
    }
    
    .post-comment__author-avatar {
        img{
            width: 30px;
            height: 30px;
            background-color: #b9b9b9;
            border-radius: 50%;
        }
    }
    
    .post-comment__author-label {
        padding-left: 15px;
        font-weight: 500;
    }
    
    .post-comment-item__menu{
        display: flex;
        flex-direction: row;
    }
    
    textarea{
        width: 97%;
        border-radius: 5px;
        border: none;
        background-color: #F3F0F0;
    }
    
    .post-comment__content{
        textarea{
            height: 60px;
        }
        margin-bottom: 15px;
    }
    
    .post-comment-item__menu-item{
        -webkit-transition: 0.1s ease;
        -moz-transition: 0.1s ease;
        -o-transition: 0.1s ease;
        transition: 0.1s ease;
        opacity: 0;
        cursor: pointer;
        margin: 0 5px 0 5px;
    
        img{
            height: 15px;
        }
    }
    
    :hover .post-comment-item__menu-item{
        opacity: 1;
        -webkit-transition: 0.1s ease;
        -moz-transition: 0.1s ease;
        -o-transition: 0.1s ease;
        transition: 0.1s ease;
    }
`