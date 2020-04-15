import React, {useEffect, useState} from 'react'
import StyledRegistrationPage from './RegistrationWindow.styled'
import StyledDialogBox from './DialogBox.styled'
import Button from "../Button";
import TextArea from "../TextArea/TextArea.component";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import pathHistory from "../../../pathHistory";
import {authenticate, IAuthenticate, ICurrent} from "../../../actions/current";
import {ThunkDispatch as Dispatch} from "redux-thunk";
import {connect} from "react-redux";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import IFaculty from '../../models/Faculty';
import ICafedra from "../../models/Cafedra";
import IGroup from "../../models/Group";

interface DispatchProps {
    onLogIn: (username: string) => void;
}

// Функция валидации данных
export function validate(name: string, value: string){
    switch(name){
        case 'email': {
            // eslint-disable-next-line no-useless-escape
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(value).toLowerCase());
        }
        case 'phone': {
            // eslint-disable-next-line no-useless-escape
            let re = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
            return re.test(String(value).toLowerCase());
        }
        case 'firstName':
        case 'lastName': {
            let re = /^[A-Za-z ]+$/;
            return re.test(String(value).toLowerCase());
        }
        // case 'passwordConfirm': {
        //    if(this.state.passwordConfirm === this.state.password){ return true } else { return false }
        // }
        default: {
            return false;
        }
    }
}

export function createFaculty(facultyName: string, descFaculty: string, toggle: boolean, setToggle: (toggle: boolean) => void){
    const facultyForm = {
        faculty_name: facultyName,
        faculty_description: descFaculty
    };
    console.log('CREATE FACULTY', facultyForm);
    if(facultyName && descFaculty){
        axios({
            method: 'post',
            url: `http://localhost:9005/faculties`,
            withCredentials: true,
            data: facultyForm,
            headers: {
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": 'http://localhost:3000',
                'Accept': 'application/json',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        }).then(res => {
            console.log('Добавлен факультет', res.data);
            setToggle(!toggle);
        })
    }
}

export function createCafedra(cafedraName: string, descCafedra: string, facultyID: number, toggle: boolean, setToggle: (toggle: boolean) => void, getCafedras: (id: number, setCafedras: (array: []) => void) => void, setCafedras: (array: []) => void){
    const cafedraForm = {
        name_kafedra: cafedraName,
        description_kafedra: descCafedra,
        faculty: facultyID
    };
    console.log('CREATE CAFEDRA', cafedraForm);
    if(cafedraName && descCafedra && facultyID){
        axios({
            method: 'post',
            url: `http://localhost:9005/departments`,
            withCredentials: true,
            data: cafedraForm,
            headers: {
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": 'http://localhost:3000',
                'Accept': 'application/json',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        }).then(res => {
            console.log('Добавлена кафедра', res.data);
            getCafedras(facultyID, setCafedras);
            setToggle(!toggle);
        })
    }
}

export function createGroup(nameGroup: string, descGroup: string, cafedraID: number, course: number, getGroups: (id: number, setGroups: (array: []) => void) => void, toggle: boolean, setToggle: (toggle: boolean) => void, setGroups: (array: []) => void){
    const groupForm = {
        name_group: nameGroup,
        description_group: descGroup,
        kafedra: cafedraID,
        course: course,
        stream: 0
    };
    console.log('CREATE GROUP', groupForm);
    if(nameGroup && descGroup && cafedraID){
        axios({
            method: 'post',
            url: `http://localhost:9005/studygroups`,
            withCredentials: true,
            data: groupForm,
            headers: {
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": 'http://localhost:3000',
                'Accept': 'application/json',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        }).then(res => {
            console.log('Добавлена кафедра', res.data);
            getGroups(cafedraID, setGroups);
            setToggle(!toggle);
        })
    }
}

export function getFaculties(setFaculties: (array: []) => void){
    axios({
        method: 'get',
        url: `http://localhost:9005/faculties`,
        withCredentials: true,
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": 'http://localhost:3000',
            'Accept': 'application/json',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    }).then( res => {
        console.log('Факультеты', res.data);
        setFaculties(res.data.content);
    }).catch( err => {
        console.log('Факультеты', err);
    })
}

export function getCafedras(id: number, setCafedras: (array: []) => void){
    axios({
        method: 'get',
        url: `http://localhost:9005/departments/faculty?facultyid=${id}`,
        withCredentials: true,
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": 'http://localhost:3000',
            'Accept': 'application/json',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    }).then( res => {
        console.log('Кафедры', res.data);
        setCafedras(res.data.content);
    }).catch( err => {
        console.log('Кафедры', err);
    })
}

export function getGroups(id: number, setGroups: (array: []) => void){
    axios({
        method: 'get',
        url: `http://localhost:9005/studygroups/kafedra?kafedraid=${id}`,
        withCredentials: true,
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": 'http://localhost:3000',
            'Accept': 'application/json',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    }).then( res => {
        console.log('Группы', res.data);
        setGroups(res.data.content);
    }).catch( err => {
        console.log('Группы', err);
    })
}

export function onChangeFaculty(event: React.ChangeEvent<HTMLSelectElement>, setDialogMode: (mode: string) => void, setOpen: (mode: boolean) => void, setFacultyChecked: (mode: boolean) => void, setFacultyID: (id: number) => void, setCafedras: (array: []) => void){
    if(event.target.value === "null"){
        setDialogMode('faculty');
        setOpen(true);
        setFacultyChecked(false);
    } else {
        if(event.target.value === "") {
            setFacultyChecked(false);
        }
        else
        {
            setFacultyChecked(true);
            axios({
                method: 'get',
                url: `http://localhost:9005/faculties/${event.target.value} `,
                withCredentials: true,
                headers: {
                    "Access-Control-Allow-Credentials": true,
                    "Access-Control-Allow-Origin": 'http://localhost:3000',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }
            }).then( res => {
                console.log('Факультет', res.data);
                // setFaculty(res.data);
                setFacultyID(res.data.id);
                getCafedras(res.data.id, setCafedras);
            }).catch( err => {
                console.log('Факультет', err);
            })
        }
    }
}

export function onChangeGroup(event: React.ChangeEvent<HTMLSelectElement>, setDialogMode: (mode: string) => void, setOpen: (mode: boolean) => void, setGroupID: (id: number) => void){
    if(event.target.value === "null"){
        setDialogMode('group');
        setOpen(true);
        // setGroupChecked(false);
    } else {
        if(event.target.value === "") {
            // setGroupChecked(false);
        } else
        {
            // setGroup(event.target.value);
            // setGroupChecked(true);
            console.log('АЙДИ ГРУППЫ', event.target.value);
            axios({
                method: 'get',
                url: `http://localhost:9005/studygroups/${event.target.value}  `,
                withCredentials: true,
                headers: {
                    "Access-Control-Allow-Credentials": true,
                    "Access-Control-Allow-Origin": 'http://localhost:3000',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }
            }).then( res => {
                console.log('Группа', res.data);
                // setGroup(res.data);
                setGroupID(res.data.id);
            }).catch( err => {
                console.log('Группа', err);
            })
        }
    }
}

export function onChangeCafedra(event: React.ChangeEvent<HTMLSelectElement>, setDialogMode: (mode: string) => void, setOpen: (mode: boolean) => void, setCafedraChecked: (mode: boolean) => void, setCafedraID: (id: number) => void, setGroups: (array: []) => void){
    if(event.target.value === "null"){
        setDialogMode('cafedra');
        setOpen(true);
        setCafedraChecked(false);
    } else {
        if(event.target.value === "") {
            setCafedraChecked(false); } else
        {
            // setCafedra(event.target.value);
            setCafedraChecked(true);
            console.log('АЙДИ КАФДЕРЫ', event.target.value);
            axios({
                method: 'get',
                url: `http://localhost:9005/departments/${event.target.value}  `,
                withCredentials: true,
                headers: {
                    "Access-Control-Allow-Credentials": true,
                    "Access-Control-Allow-Origin": 'http://localhost:3000',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }
            }).then( res => {
                console.log('Кафедра', res.data);
                // setCafedra(res.data);
                setCafedraID(res.data.id);
                getGroups(res.data.id, setGroups);
            }).catch( err => {
                console.log('Кафедра', err);
            })
        }
    }
}

function RegistrationWindow({onLogIn}: DispatchProps){

    // Переключатели
    const [toggle, setToggle] = useState(false);
    const [open, setOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState('');

    // Данные о пользователе
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [birthday, setBirthday] = useState(0);
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
    const [groupID, setGroupID] = useState(0);
    const [course, setCourse] = useState(0);
    // const [groupChecked, setGroupChecked] = useState(false);

    // Функция открытия модального окна
    // function openWindow() {
    //     setOpen(true)
    // }

    // Функция закрытия модального окна
    function closeWindow() {
        setOpen(false)
    }

    useEffect(() => {
        // Выдать список факультетов
        getFaculties(setFaculties);
    },[toggle]);

    function createUser(event: React.FormEvent<HTMLFormElement>){
        console.log("formSubmitted");
        var studygroup;
        if(isStudent) {studygroup = groupID;} else studygroup = null
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
            username: userName,
            password: password
        };

        console.log("userForm", userForm);
        axios({
            method: 'post',
            url: `http://localhost:9005/users`,
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
                const authForm = {
                    login: userName,
                    pass: password
                };
                console.log('AUTHFORM', authForm);
                axios({
                    method: 'post',
                    url: `http://localhost:9005/login`,
                    data: authForm,
                    withCredentials: true,
                    headers: {
                        "Access-Control-Allow-Credentials": true,
                        "Access-Control-Allow-Origin": 'http://localhost:3000',
                        'Accept': 'application/json',
                        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    }
                })
                    .then(res => {
                        console.log('ON GET DATA, getDataSuccess', res);
                        onLogIn(userName);
                        pathHistory.push(`/users/${userName}`);
                    })
                    .catch(error => {
                        console.log('ON GET DATA, error', error.response.data);
                    });
            })
            .catch(error => {
              console.log(error);
            });
        event.preventDefault();
    }

    let isValid = true;
    let id = '';

    function setData(event: React.ChangeEvent<HTMLInputElement>){
        console.log('handleChange', event);
        switch (event.target.name) {
            case 'firstName': {
                setFirstName(event.target.value);
                console.log(validate(event.target.name,event.target.value));
                isValid = validate(event.target.name,event.target.value);
                id = event.target.name;
                break;
            }
            case 'lastName': {
                setLastName(event.target.value);
                console.log(validate(event.target.name,event.target.value));
                isValid = validate(event.target.name,event.target.value);
                id = event.target.name;
                break;
            }
            case 'phone': {
                setPhone(event.target.value);
                console.log(validate(event.target.name,event.target.value));
                isValid = validate(event.target.name,event.target.value);
                id = event.target.name;
                break;
            }
            case 'email': {
                setEmail(event.target.value);
                console.log(validate(event.target.name,event.target.value));
                isValid = validate(event.target.name,event.target.value);
                id = event.target.name;
                break;
            }
            case 'password': {
                setPassword(event.target.value);
                console.log(validate(event.target.name,event.target.value));
                isValid = validate(event.target.name,event.target.value);
                id = event.target.name;
                break;
            }
            case 'passwordConfirm': {
                setPasswordConfirm(event.target.value);
                console.log(validate(event.target.name,event.target.value));
                isValid = validate(event.target.name,event.target.value);
                id = event.target.name;
                break;
            }
            case 'userName': {
                setUserName(event.target.value);
                console.log(validate(event.target.name,event.target.value));
                isValid = validate(event.target.name,event.target.value);
                id = event.target.name;
                break;
            }
            case 'description': {
                setDescription(event.target.value);
                console.log(validate(event.target.name,event.target.value));
                isValid = validate(event.target.name,event.target.value);
                id = event.target.name;
                break;
            }
            case 'studyGroup': {
                // setGroup(event.target.value);
                console.log(validate(event.target.name,event.target.value));
                isValid = validate(event.target.name,event.target.value);
                id = event.target.name;
                break;
            }
            case 'dateOfBirth': {
                console.log('Date', typeof event.target.value);
                console.log('Date', Date.parse(event.target.value));
                setBirthday(Date.parse(event.target.value));
                setDate(event.target.value);
                console.log('Date', event.target.value);
                console.log(validate(event.target.name,event.target.value));
                isValid = validate(event.target.name,event.target.value);
                id = event.target.name;
                break;
            }
            case 'nameFaculty': {
                setFacultyName(event.target.value);
                break;
            }
            case 'descFaculty': {
                setDescFaculty(event.target.value);
                break;
            }
            case 'cafedraName': {
                setCafedraName(event.target.value);
                break;
            }
            case 'descCafedra': {
                setDescCafedra(event.target.value);
                break;
            }
            case 'nameGroup': {
                setNameGroup(event.target.value);
                break;
            }
            case 'descGroup': {
                setDescGroup(event.target.value);
                break;
            }
            case 'course': {
                if(event.target.value === '1') setCourse(1); else
                if(event.target.value === '2') setCourse(2); else
                if(event.target.value === '3') setCourse(3); else
                if(event.target.value === '4') setCourse(4); else
                if(event.target.value === '5') setCourse(5); else
                if(event.target.value === '6') setCourse(6); else setCourse(0);
                break;
            }
        }

        if(event.target.value === '') {
            isValid = true;
        }


    }

    return (
            <StyledRegistrationPage id={id} isValid={isValid}>
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
                                            onChange={setData}
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
                                            onChange={setData}
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
                                            onChange={setData}
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
                                            onChange={setData}
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
                                            onChange={setData}
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
                                            onChange={setData}
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
                                            onChange={setData}
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
                <form action="">
                    <div className="registration-page__row">
                        <div className="registration-page__element">
                            Ваше имя
                            <input
                                id="firstName"
                                type="text"
                                name="firstName"
                                placeholder="Введите имя"
                                value={firstName}
                                onChange={setData}
                                required
                            />
                            {
                                !firstName ? null :
                                    isValid ? null :
                                        id === 'firstName' ?
                                            <div className="registration-page__additional-text">
                                                Данные некорректны
                                            </div> : null
                            }
                        </div>
                        <div className="registration-page__element">
                            Ваша фамилия
                            <input
                                id="lastName"
                                type="text"
                                name="lastName"
                                placeholder="Введите фамилию"
                                value={lastName}
                                onChange={setData}
                                required
                            />
                            {
                                isValid || !lastName ? null :
                                    id === 'lastName' ?
                                        <div className="registration-page__additional-text">
                                            Данные некорректны
                                        </div> : null
                            }
                        </div>
                    </div>
                    <div className="registration-page__row">
                        <div className="registration-page__element">
                            Дата рождения
                            <input
                                id="dateOfBirth"
                                type="date"
                                name="dateOfBirth"
                                placeholder="Дата рождения"
                                onChange={setData}
                                value={date}
                                required
                            />
                        </div>
                        <div className="registration-page__element">
                            Номер телефона
                            <input
                                id="phone"
                                type="text"
                                name="phone"
                                placeholder="Введите номер телефона"
                                value={phone}
                                onChange={setData}
                                required
                            />
                            {
                                isValid || !phone ? null :
                                 id === 'phone' ?
                                     <div className="registration-page__additional-text">
                                        Данные некорректны
                                     </div> : null
                            }
                        </div>
                    </div>
                    <div className="registration-page__row">
                        <div className="registration-page__element">
                            Ваш e-mail
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Введите E-mail"
                                value={email}
                                onChange={setData}
                                required
                            />
                            {
                                isValid || !email ? null :
                                    id === 'email' ?
                                        <div className="registration-page__additional-text">
                                            Данные некорректны
                                        </div> : null
                            }
                        </div>

                    </div>
                    {(
                        isStudent ?
                            <div className="registration-page__row">
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
                            </div> 
                        : null
                    )}
                    <div className="registration-page__row">
                        <div className="registration-page__element">
                            Пароль
                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Пароль"
                                value={password}
                                onChange={setData}
                                required
                            />
                        </div>
                        <div className="registration-page__element">
                            Повторите пароль
                            <input
                                id="passwordConfirm"
                                type="password"
                                name="passwordConfirm"
                                placeholder="Повторите пароль"
                                value={passwordConfirm}
                                onChange={setData}
                                required
                            />
                            {/*{*/}
                            {/*    this.isValid || !this.state.passwordConfirm ? null :*/}
                            {/*        this.id === 'passwordConfirm' ?*/}
                            {/*            <div className="registration-page__additional-text">*/}
                            {/*                Data must be identity*/}
                            {/*            </div> : null*/}
                            {/*}*/}
                        </div>
                    </div>
                    <div className="registration-page__row">
                        <div className="registration-page__element">
                            Имя пользователя
                            <input
                                id="userName"
                                type="text"
                                name="userName"
                                placeholder="Имя пользователя"
                                value={userName}
                                onChange={setData}
                                required
                            />
                        </div>
                    </div>
                    <div className="registration-page__row">
                        <div className="registration-page__element">
                            Немного о себе
                            <TextArea
                                id="description"
                                name='description'
                                placeholder="Опишите себя"
                                value={description}
                                onChange={setData}
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
                    </div>
                    <div className="registration-page__row">
                        <div className="row-box">
                            <input type="checkbox" id="student" name="student" onChange={() => { setStudent(!isStudent)}} defaultChecked={true}/>
                            <label htmlFor="student">Я студент</label>
                        </div>
                        {(
                            isStudent ?
                                <div className="row-box">
                                    <input type="checkbox" id="student" name="student" onChange={() => { setStarosta(!isStarosta)}} defaultChecked={false}/>
                                    <label htmlFor="student">Я староста</label>
                                </div> : null
                        )}
                    </div>
                    <div className="registration-page__row">
                        <div className="registration-page__element">
                            <Button
                                onClick={createUser}
                                color="#3E76BB"
                                activeColor="#3E76BB"
                            >
                                Отправить данные
                            </Button>
                        </div>
                        <div className="registration-page__element">
                            <Button
                                onClick={() => {pathHistory.push('/')}}
                                color="#FB4141"
                                activeColor="#FB4141"
                                value='/'
                            >
                                Вернуться
                            </Button>
                        </div>
                        <div>
                        </div>
                    </div>
                </form>
            </StyledRegistrationPage>
        );
}

const mapStateToProps = (state: ICurrent) => ({
    isAuthenticated: state.isAuthenticated
});

function mapDispatchToProps(dispatch: Dispatch<IAuthenticate, {}, any>): DispatchProps{
    return {
        onLogIn: (username: string) => {
            dispatch(authenticate(username));
        }
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps,
)(RegistrationWindow);
