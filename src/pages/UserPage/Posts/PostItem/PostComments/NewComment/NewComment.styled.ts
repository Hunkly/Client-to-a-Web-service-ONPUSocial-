import styled from '@emotion/styled';

export default styled.div`
    border-top: 0.1px solid #BDBDBD;
    padding-top: 15px;
    display: flex;
    flex-direction: row; 
    align-items: center;

    textarea{
        width: 97%;
        height: 25px;
        border-radius: 5px;
        border: none;
        background-color: #F3F0F0;
    }
    
    // button{
    //     svg{
    //         fill: white;
    //         width: 30px;
    //         height: 25px;
    //     }
    //     padding-bottom: 5px;
    // }
    
    .new-comment__button-container{
        margin-top: 15px;
        display: flex;
        justify-content: flex-end;
    }
`