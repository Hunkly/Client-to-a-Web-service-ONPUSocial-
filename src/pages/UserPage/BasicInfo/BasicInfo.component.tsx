import React, {useState,useEffect} from 'react';
import StyledBasicInfo from './BasicInfo.styled';
import UserModel from '../../../shared/models/User';
import BasicInfoItem from './BasicInfoItem';
import Headline from '../../../shared/components/HeadLine';
import PageLabel from '../../../shared/components/PageLabel';

interface IBasicInfoProps {
    user: UserModel;
}

export default function BasicInfo({ user }: IBasicInfoProps) {
    let date = new Date(user.birthday)
    const [age, setAge] = useState(0);

    useEffect(() => {
        calculate_age();
    },[date])
    function calculate_age(){
        var today = new Date();
        var birthDate = new Date(user.birthday);
        var age_now = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
        {
            age_now--;
        }
        console.log(age_now);
        setAge(age_now);
    }

    return (
        <StyledBasicInfo>
          <Headline>{user.first_name} {user.last_name}</Headline>
                <div className="basic-info__container">
                    <div className="basic-info__data">
                        <PageLabel>Personal information</PageLabel>
                        <BasicInfoItem title="User name">{user.username}</BasicInfoItem>
                        <BasicInfoItem title="Age">{age}</BasicInfoItem>
                        <BasicInfoItem title="Faculty">ICS</BasicInfoItem>
                        <BasicInfoItem title="Cafedra">SPO</BasicInfoItem>
                        <BasicInfoItem title="Birthday">{date.toDateString()}</BasicInfoItem>
                        <BasicInfoItem title="Group">null</BasicInfoItem>
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
