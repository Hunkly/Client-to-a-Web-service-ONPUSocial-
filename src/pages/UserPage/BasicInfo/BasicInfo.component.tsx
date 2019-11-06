import React from 'react';
import StyledBasicInfo from './BasicInfo.styled';
import UserModel from '../../../shared/models/User';
import BasicInfoItem from './BasicInfoItem';
import Headline from '../../../shared/components/HeadLine';
import PageLabel from '../../../shared/components/PageLabel';

interface IBasicInfoProps {
    user: UserModel;
}

export default function BasicInfo({ user }: IBasicInfoProps) {
    return (
        <StyledBasicInfo>
          <Headline>{user.first_name} {user.last_name}</Headline>
                <div className="basic-info__container">
                    <div className="basic-info__data">
                        <PageLabel>Personal information</PageLabel>
                        <BasicInfoItem title="Age">20</BasicInfoItem>
                        <BasicInfoItem title="Faculty">ICS</BasicInfoItem>
                        <BasicInfoItem title="Cafedra">SPO</BasicInfoItem>
                        <BasicInfoItem title="Birthday">{user.birthday}</BasicInfoItem>
                        <BasicInfoItem title="Group">{user.studygroup.name_group}</BasicInfoItem>
                        <BasicInfoItem title="Email">{user.email}</BasicInfoItem>
                    </div>
                    <div className="basic-info__data">
                        <PageLabel>About</PageLabel>
                        <div className="basic-info__about">{user.description}  </div>
                    </div>
                </div>
        </StyledBasicInfo>
    );
}
