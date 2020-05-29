import styled from '@emotion/styled'

export default styled.div`
    width: 500px;
    height: 100%;
    padding: 20px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    input, select{
        padding-left: 10px;
        height: 30px;
        width: 97%;
        border-radius: 5px;
        border: 1px solid #000;
        margin-top: 5px;
        margin-bottom: 10px;
    }
    
    select {
        width: 50%;
    }
    
    textarea{
        border: 1px solid #000;
        height: 100px;
        margin-bottom: 10px;
    }
    
    img{
        margin-left: 10px;
    }
    
    .align-items-center{
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }
    
    .dialog-box {
        margin-bottom: 20px
    }
`
