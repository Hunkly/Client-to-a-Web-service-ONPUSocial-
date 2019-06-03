import React from 'react';
import HeadLine from '../HeadLine';
import StyledEditPageHeadLine from './EditPageHeadLine.styled';
import { ReactComponent as PencilIcon } from '../../../assets/icons/pencil.svg';

interface IEditPageHeadLineProps {
    children: React.ReactNode;
}
export default function EditPageHeadline({ children }: IEditPageHeadLineProps) {
    const appendComponent = (
        <StyledEditPageHeadLine>
            <div className="edit-page-headline__append-label">Edit page</div>
            <div className="edit-page-headline__append-icon">
                <PencilIcon />
            </div>
        </StyledEditPageHeadLine>
    );

    return <HeadLine appendComponent={appendComponent}>{children}</HeadLine>;
}
