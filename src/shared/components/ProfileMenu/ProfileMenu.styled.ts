import styled from '@emotion/styled';

export default styled.div`
    margin-right: 50px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    
    .profile-menu__avatar {
    
        img {
            width: 224px;
            height: 224px;
            object-fit: cover;
            background-color: #9f9f9f;
            border-radius: 50%;
        }
    }
    
    .profile-menu__button-box{
        label {
           cursor: pointer;
        }
        
        #upload-photo {
           opacity: 0;
           position: absolute;
           z-index: -1;
        }
        margin-top: 30px;
        margin-bottom: 50px;
        width: 100%;
        
        button {
            margin-top: 10px;
            width: 100%;
            max-width: 224px;
            height: 55px;
        }
    }
`;
