import React, {useState,useEffect} from 'react';
import StyledBasicInfo from './PersonalInformation.styled';
import UserModel from '../../../shared/models/User';
import PersonalInformationItem from './PersonalInformationItem';
import Headline from '../../../shared/components/HeadLine';
import PageLabel from '../../../shared/components/PageLabel';

interface IBasicInfoProps {
    user: UserModel;
}

export function calculateAge(birthday: number){
    let today = new Date();
    let birthDate = new Date(birthday);
    let age_now = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
    {
        age_now--;
    }
    console.log(age_now);
    return age_now;
}

export function PersonalInformation({ user }: IBasicInfoProps) {
    let date = new Date(user.birthday);
    const [age, setAge] = useState(0);

    useEffect(() => {
        setAge(calculateAge(user.birthday));
    },[date]);

    return (
        <StyledBasicInfo>
          <Headline>{user.first_name} {user.last_name}</Headline>
                <div className="basic-info__container">
                    <div className="basic-info__data">
                        <PageLabel>Personal information</PageLabel>
                        <PersonalInformationItem title="User name">{user.username}</PersonalInformationItem>
                        <PersonalInformationItem title="Age">{age}</PersonalInformationItem>
                        <PersonalInformationItem title="Faculty">ICS</PersonalInformationItem>
                        <PersonalInformationItem title="Cafedra">SPO</PersonalInformationItem>
                        <PersonalInformationItem title="Birthday">{date.toDateString()}</PersonalInformationItem>
                        <PersonalInformationItem title="Group">null</PersonalInformationItem>
                        <PersonalInformationItem title="Email">{user.email}</PersonalInformationItem>
                    </div>
                    <div className="basic-info__data">
                        <PageLabel>About</PageLabel>
                        <div className="basic-info__about">{user.description}  </div>
                    </div>
                </div>
        </StyledBasicInfo>
    );
}
