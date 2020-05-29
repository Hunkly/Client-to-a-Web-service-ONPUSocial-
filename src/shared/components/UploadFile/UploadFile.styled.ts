import styled from '@emotion/styled'

export default styled.div`
    .btn-tertiary{
        color:#555;
        padding: 0 0 0 10px;
        line-height:40px;
        width:300px;
        display:block;
        border:2px solid #555
    }
    
    .btn-tertiary:hover,
    .btn-tertiary:focus{
        color:#888;
        border-color:#888
        }
        
    .input-file{
        width:.1px;
        height:.1px;
        opacity:0;
        overflow:hidden;
        position:absolute;
        z-index:-1
    }
    
    .input-file + .js-labelFile .icon:before{
        content:"\\f093"
    }
    
    .input-file + .js-labelFile.has-file .icon:before{
        content:"\\f00c";
        color:#5AAC7B
    }
`
