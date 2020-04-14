import React, {useState,useEffect} from 'react';
import StyledBasicInfo from './PersonalInformation.styled';
import UserModel from '../../models/User';
import PersonalInformationItem from './PersonalInformationItem';
import Headline from '../HeadLine';
import PageLabel from '../PageLabel';

interface IBasicInfoProps {
    user: UserModel;
    viewMode: 'profile' | 'otherProfile';
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

export function PersonalInformation({viewMode, user }: IBasicInfoProps) {
    let date = new Date(user.birthday);
    const [age, setAge] = useState(0);

    useEffect(() => {
        setAge(calculateAge(user.birthday));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[date]);

    return (
        <StyledBasicInfo>
            {
                viewMode === 'profile' ?
            <Headline>{user.first_name} {user.last_name} (Это Вы)</Headline> : <Headline>{user.first_name} {user.last_name}</Headline>
            }
            <PageLabel>Личная информация</PageLabel>
            <div className="basic-info__container">
                <div className="basic-info__data">
                    <PersonalInformationItem title="Имя пользователя">{user.username}</PersonalInformationItem>
                    <PersonalInformationItem title="Возраст">{age}</PersonalInformationItem>
                    {
                        user.studygroup !== null ? <div>
                            <PersonalInformationItem title="Факультет">{user.studygroup.kafedra.faculty.faculty_name}</PersonalInformationItem>
                            <PersonalInformationItem title="Кафедра">{user.studygroup.kafedra.name_kafedra}</PersonalInformationItem>
                            <PersonalInformationItem title="Группа">{user.studygroup.name_group}</PersonalInformationItem>
                        </div> : null
                    }
                    <PersonalInformationItem title="Дата рождения">{date.toDateString()}</PersonalInformationItem>
                    <PersonalInformationItem title="E-mail">{user.email}</PersonalInformationItem>
                </div>
            </div>
            <PageLabel>О себе</PageLabel>
            <div className="basic-info__container">
                <div className="basic-info__data">
                    <div className="basic-info__about">{user.description}</div>
                </div>
            </div>
        </StyledBasicInfo>
    );
}
