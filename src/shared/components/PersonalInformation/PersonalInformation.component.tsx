import React, {useState,useEffect} from 'react';
import StyledBasicInfo from './PersonalInformation.styled';
import UserModel from '../../models/User';
import PersonalInformationItem from './PersonalInformationItem';
import Headline from '../HeadLine';
import PageLabel from '../PageLabel';
import ProfileMenu from "../ProfileMenu";
import {
    createFaculty,
    createCafedra,
    createGroup,
    getFaculties,
    getCafedras,
    getGroups,
    onChangeFaculty,
    onChangeGroup,
    onChangeCafedra,
    validate
} from '../RegistrationWindow/RegistrationWindow..component'
import IFaculty from "../../models/Faculty";
import ICafedra from "../../models/Cafedra";
import IGroup from "../../models/Group";
import StyledDialogBox from "../RegistrationWindow/DialogBox.styled";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextArea from "../TextArea/TextArea.component";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "../Button/Button.component";
import Dialog from "@material-ui/core/Dialog";
import axios from "axios";

interface IBasicInfoProps {
    user: UserModel;
    viewMode: 'profile' | 'otherProfile' | 'editProfile' | 'news';
    // editMode?: () => void;
    // cancelEdit?: () => void;
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
    let viewDate = new Date(user.birthday);
    const [editMode, setEditMode] = useState(false);
    const [age, setAge] = useState(0);
    const [toggle, setToggle] = useState(false);
    const [open, setOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState('');
    // Данные о пользователе
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [description, setDescription] = useState(user.description);
    const [userName, setUserName] = useState(user.username);
    // const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [birthday, setBirthday] = useState(user.birthday);
    const [date, setDate] = useState('');
    const [isStudent, setStudent] = useState(true);
    const [isStarosta, setStarosta] = useState(false);

    // Данные о факультете
    // const [faculty, setFaculty] = useState({});
    const [faculties, setFaculties] = useState([]);
    const [facultyName, setFacultyName] = useState('');
    const [descFaculty, setDescFaculty] = useState('');
    const [facultyID, setFacultyID] = useState(0);
    const [facultyChecked, setFacultyChecked] = useState(false);

    // Данные о кафедре
    // const [cafedra, setCafedra] = useState({});
    const [cafedras, setCafedras] = useState([]);
    const [cafedraName, setCafedraName] = useState('');
    const [descCafedra, setDescCafedra] = useState('');
    const [cafedraID, setCafedraID] = useState(0);
    const [cafedraChecked, setCafedraChecked] = useState(false);

    // Данные о группе
    // const [group, setGroup] = useState({});
    const [groups, setGroups] = useState([]);
    const [nameGroup, setNameGroup] = useState('');
    const [descGroup, setDescGroup] = useState('');
    var ID;
    if(user.studygroup == null){
        ID = 0;
    } else {
        ID = user.studygroup.id
    }
    const [groupID, setGroupID] = useState(ID);

    const [course, setCourse] = useState(0);

    useEffect(() => {
        getFaculties(setFaculties);
        setAge(calculateAge(user.birthday));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[toggle]);



    function cancelEdit(){
        setEditMode(false);
    }


    function closeWindow() {
        setOpen(false)
    }

    function updateUser(){
        var studygroup;
        if(isStudent) {studygroup = groupID;} else{ studygroup = null;}
        let userForm = {
            first_name: firstName,
            last_name: lastName,
            birthday: birthday,
            email: email,
            phone: phone,
            description: description,
            photo: '/photo/test.png',
            studygroup: studygroup,
            starosta: isStarosta,
            username: userName
        };


        console.log("userForm", userForm);
        axios({
            method: 'put',
            url: `http://localhost:9005/users/${user.username}`,
            withCredentials: true,
            data: userForm,
            headers: {
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": 'http://localhost:3000',
                'Accept': 'application/json',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        })
            .then(res => {
                console.log(res.data);
                setEditMode(false);
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <StyledBasicInfo>
            <Dialog className='dialog-box' open={open} onClose={closeWindow} aria-labelledby="form-dialog-title">
                {
                    dialogMode === 'faculty' ?
                        <StyledDialogBox>
                            <DialogTitle id="form-dialog-title">Добавить факультет</DialogTitle>
                            <DialogContent>
                                <div className="dialog-box">
                                    <DialogContentText>
                                        Название факультета
                                    </DialogContentText>
                                    <input
                                        id="nameFaculty"
                                        type="text"
                                        name="nameFaculty"
                                        placeholder="Введите название факультета"
                                        onChange={(event) => { setFacultyName(event.target.value)}}
                                        value={facultyName}
                                        required
                                    />

                                </div>
                                <div className="dialog-box">
                                    <DialogContentText>
                                        Описание
                                    </DialogContentText>
                                    <TextArea
                                        id="descFaculty"
                                        name='descFaculty'
                                        placeholder="Введите описание"
                                        value={descFaculty}
                                        onChange={(event) => { setDescFaculty(event.target.value)}}
                                        maxLength={200}
                                        required={true}
                                    />
                                    {
                                        description.length<200 ? null :
                                            <div className="registration-page__additional-text">
                                                Данные чересчур длинные
                                            </div>
                                    }
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    color="#3E76BB"
                                    activeColor="#3E76BB"
                                    onClick={() => {createFaculty(facultyName, descFaculty, toggle, setToggle)}}
                                >
                                    Отправить
                                </Button>
                            </DialogActions>
                        </StyledDialogBox>
                        : dialogMode === 'cafedra' ?
                        <StyledDialogBox>
                            <DialogTitle id="form-dialog-title">Добавить кафедру</DialogTitle>
                            <DialogContent>
                                <div className="dialog-box">
                                    <DialogContentText>
                                        Название кафедры
                                    </DialogContentText>
                                    <input
                                        id="cafedraName"
                                        type="text"
                                        name="cafedraName"
                                        placeholder="Введите название кафедры"
                                        onChange={(event) => { setCafedraName(event.target.value)}}
                                        value={cafedraName}
                                        required
                                    />

                                </div>
                                <div className="dialog-box">
                                    <DialogContentText>
                                        Описание
                                    </DialogContentText>
                                    <TextArea
                                        id="descCafedra"
                                        name='descCafedra'
                                        placeholder="Введите описание"
                                        value={descCafedra}
                                        onChange={(event) => { setDescCafedra(event.target.value)}}
                                        maxLength={200}
                                        required={true}
                                    />
                                    {
                                        description.length<200 ? null :
                                            <div className="registration-page__additional-text">
                                                Данные чересчур длинные
                                            </div>
                                    }
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    color="#3E76BB"
                                    activeColor="#3E76BB"
                                    onClick={() => {createCafedra(cafedraName, descCafedra, facultyID, toggle, setToggle, getCafedras, setCafedras)}}
                                >
                                    Отправить
                                </Button>
                            </DialogActions>
                        </StyledDialogBox>
                        :
                        <StyledDialogBox>
                            <DialogTitle id="form-dialog-title">Добавить группу</DialogTitle>
                            <DialogContent>
                                <div className="dialog-box">
                                    <DialogContentText>
                                        Название группы
                                    </DialogContentText>
                                    <input
                                        id="nameGroup"
                                        type="text"
                                        name="nameGroup"
                                        placeholder="Введите название группы"
                                        onChange={(event) => { setNameGroup(event.target.value)}}
                                        value={nameGroup}
                                        required
                                    />

                                </div>
                                <div className="dialog-box">
                                    <DialogContentText>
                                        Курс
                                    </DialogContentText>
                                    <input
                                        id="course"
                                        type="number"
                                        name="course"
                                        placeholder="Введите номер курса"
                                        onChange={(event) => {
                                            if(event.target.value === '1') setCourse(1); else
                                            if(event.target.value === '2') setCourse(2); else
                                            if(event.target.value === '3') setCourse(3); else
                                            if(event.target.value === '4') setCourse(4); else
                                            if(event.target.value === '5') setCourse(5); else
                                            if(event.target.value === '6') setCourse(6); else setCourse(0);}}
                                        value={course}
                                        required
                                    />
                                    {/*<select value={course} onChange={(event) => { setCourse(event.target.value); }}>*/}
                                    {/*    <option value={1}>1-й курс</option>*/}
                                    {/*    <option value={2}>2-й курс</option>*/}
                                    {/*    <option value={3}>3-й курс</option>*/}
                                    {/*    <option value={4}>4-й курс</option>*/}
                                    {/*    <option value={5}>5-й курс</option>*/}
                                    {/*    <option value={6}>6-й курс</option>*/}
                                    {/*</select>*/}
                                </div>
                                <div className="dialog-box">
                                    <DialogContentText>
                                        Описание
                                    </DialogContentText>
                                    <TextArea
                                        id="descGroup"
                                        name='descGroup'
                                        placeholder="Введите описание"
                                        value={descGroup}
                                        onChange={(event) => { setDescGroup(event.target.value)}}
                                        maxLength={200}
                                        required={true}
                                    />
                                    {
                                        description.length<200 ? null :
                                            <div className="registration-page__additional-text">
                                                Данные чересчур длинные
                                            </div>
                                    }
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    color="#3E76BB"
                                    activeColor="#3E76BB"
                                    onClick={() => {createGroup(nameGroup, descGroup, cafedraID, course, getGroups, toggle, setToggle, setGroups)}}
                                >
                                    Отправить
                                </Button>
                            </DialogActions>
                        </StyledDialogBox>
                }
            </Dialog>
            <ProfileMenu viewMode={viewMode} user={user} editMode={editMode} setEditMode={setEditMode} cancelEdit={cancelEdit} updateUser={updateUser}/>
            <div>
                {
                    viewMode === 'profile' ?
                        editMode ?
                            <Headline>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(event) => { setFirstName(event.target.value) }}
                                /> <input
                                type="text"
                                value={lastName}
                                onChange={(event) => { setLastName(event.target.value) }}
                            />
                            </Headline> :
                    <Headline>{user.first_name} {user.last_name} (Это Вы)</Headline> :
                        <Headline>{user.first_name} {user.last_name}</Headline>
                }
                <PageLabel>Личная информация</PageLabel>
                <div className="basic-info__container">
                    <div className="basic-info__data">
                        {
                                editMode ?
                                    <div>
                                        <PersonalInformationItem title="Имя пользователя">
                                            <input
                                                type="text"
                                                value={userName}
                                                onChange={(event) => { setUserName(event.target.value) }}
                                            />
                                        </PersonalInformationItem>
                                        <PersonalInformationItem title="Я не студент">
                                            <input type="checkbox" id="student" name="student" onChange={() => {console.log('is student', !isStudent); setStudent(!isStudent)}} defaultChecked={false}/>
                                        </PersonalInformationItem>
                                        <PersonalInformationItem title="Дата рождения">
                                            <input
                                                type="date"
                                                value={date}
                                                onChange={(event) => { setBirthday(Date.parse(event.target.value)); setDate(event.target.value) }}
                                            />
                                        </PersonalInformationItem>
                                        {
                                            isStudent ? <div className="registration-page__row">
                                                <div className="registration-page__element">
                                                    Факультет
                                                    <select value={facultyID} onChange={(event) => {onChangeFaculty(event, setDialogMode, setOpen, setFacultyChecked, setFacultyID, setCafedras)}}>
                                                        <option value="">Выберите факультет</option>
                                                        <option value="null">Моего факультета нет в списке</option>
                                                        {
                                                            faculties.map((data: IFaculty) => (
                                                                <option key={data.id} value={data.id}>{data.faculty_name}</option>
                                                            ))}
                                                        }
                                                    </select>
                                                </div>
                                                <div className="registration-page__element">
                                                    Кафедра
                                                    <select onChange={(event) => {onChangeCafedra(event, setDialogMode, setOpen, setCafedraChecked, setCafedraID, setGroups)}} disabled={!facultyChecked}>
                                                        <option value="">Выберите кафедру</option>
                                                        <option value="null">Моей кафедры нет в списке</option>
                                                        {
                                                            cafedras.map((data: ICafedra) => (
                                                                <option key={data.id} value={data.id}>{data.name_kafedra}</option>
                                                            ))}
                                                        }
                                                    </select>
                                                </div>
                                                <div className="registration-page__element">
                                                    Группа
                                                    <select onChange={(event) => {onChangeGroup(event, setDialogMode, setOpen, setGroupID)}} disabled={!cafedraChecked}>
                                                        <option value="">Выберите группу</option>
                                                        <option value="null">Моей группы нет в списке</option>
                                                        {
                                                            groups.map((data: IGroup) => (
                                                                <option key={data.id} value={data.id}>{data.name_group}</option>
                                                            ))}
                                                        }
                                                    </select>
                                                </div>
                                            </div> : null
                                        }

                                        <PersonalInformationItem title="E-mail">
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(event) => { setEmail(event.target.value) }}
                                            />
                                        </PersonalInformationItem>
                                    </div>
                                 : <div>
                                    <PersonalInformationItem title="Имя пользователя">{user.username}</PersonalInformationItem>
                                    <PersonalInformationItem title="Возраст">{age}</PersonalInformationItem>
                                    {
                                        user.studygroup !== null ? <div>
                                            <PersonalInformationItem title="Факультет">{user.studygroup.kafedra.faculty.faculty_name}</PersonalInformationItem>
                                            <PersonalInformationItem title="Кафедра">{user.studygroup.kafedra.name_kafedra}</PersonalInformationItem>
                                            <PersonalInformationItem title="Группа">{user.studygroup.name_group}</PersonalInformationItem>
                                        </div> : null
                                    }
                                    <PersonalInformationItem title="Дата рождения">{viewDate.toDateString()}</PersonalInformationItem>
                                    <PersonalInformationItem title="E-mail">{user.email}</PersonalInformationItem>
                                </div>
                        }
                    </div>
                </div>
                <PageLabel>О себе</PageLabel>
                <div className="basic-info__container">
                    <div className="basic-info__data">
                        {
                            editMode ?
                                <div className="basic-info__about">
                                    <TextArea
                                        value={description}
                                        onChange={(event) => { setDescription(event.target.value);}}
                                        maxLength={200}
                                    >
                                        {user.description}
                                    </TextArea>
                                </div> :
                                <div className="basic-info__about">{user.description}</div>
                        }
                    </div>
                </div>
            </div>
        </StyledBasicInfo>
    );
}
