import styled from '@emotion/styled';

export default styled.div`
    color: #000;
    padding: 20px;
    background-color: #FCFCFC;
    
    
    p{
        font-weight: 100;
    }
    
    .post-item__author{
        display: flex;
        align-items: center;
    }
    
    .post-item__avatar {
        img{
            width: 40px;
            height: 40px;
            background-color: #b9b9b9;
            border-radius: 50%;
        }
    }
    
    .post-item__label {
        padding-left: 15px;
        font-weight: 500;
    }
    
    .post-item__picture {
        width: 700px;
        height: 200px;
        background-color: #b9b9b9;
        border-radius: 15px;
        margin-top: 10px;
    }
    
    .post-item__date{
        padding-top: 5px;
        display: flex;
        justify-content: flex-end;
        font-size: 14px;
        font-style: italic;
        // padding-bottom: 15px;
        // border-bottom: 0.1px solid #BDBDBD;
    }
    
    .post-item__container{
        display: flex;
        justify-content: space-between;
        //align-items: center;
    }
          
    .post-item__menu{
        display: flex;
        flex-direction: row;
    }
    
    .post-item__menu-item{
        -webkit-transition: 0.1s ease;
        -moz-transition: 0.1s ease;
        -o-transition: 0.1s ease;
        transition: 0.1s ease;
        opacity: 0;
        margin: 0 5px 0 5px;
        cursor: pointer;
    
        img{
            height: 15px;
        }
    }
    
    :hover .post-item__menu-item{
        opacity: 1;
        -webkit-transition: 0.1s ease;
        -moz-transition: 0.1s ease;
        -o-transition: 0.1s ease;
        transition: 0.1s ease;
    }
    
    textarea{
        width: 97%;
        border-radius: 5px;
        border: none;
        background-color: #F3F0F0;
    }
    
    .post__title{
        textarea{
            height: 15px;
        }
        margin-top: 15px;
        margin-bottom: 15px;
    }
    
    .post__content{
        textarea{
            height: 60px;
        }
        margin-bottom: 15px;
    }
    
    h3,p{
        margin: 0;
        margin-top: 10px;
    }

`;
