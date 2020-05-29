import React from 'react';
import UploadFileStyled from './UploadFile.styled';

interface IInputProps {
    onChange?: (event: any) => void;
    text: string;
}

export default function UploadFile({ onChange, text}: IInputProps){

    return (
        <UploadFileStyled >
            <div className="form-group">
                <input type="file" name="file" id="file" className="input-file" onChange={onChange}/>
                    <label htmlFor="file" className="btn btn-tertiary js-labelFile">
                        <i className="icon fa fa-check"></i>
                        <span className="js-fileName">{text}</span>
                    </label>
            </div>
        </UploadFileStyled>
    )
}
