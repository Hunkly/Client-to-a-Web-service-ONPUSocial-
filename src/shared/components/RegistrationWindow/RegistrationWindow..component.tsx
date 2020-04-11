import React, {useState} from 'react'
import StyledRegistrationPage from './RegistrationWindow.styled'
import Button from "../Button";
import DatePicker from "react-datepicker";
import TextArea from "../TextArea/TextArea.component";
import axios from 'axios';

import "react-datepicker/dist/react-datepicker.css";
import pathHistory from "../../../pathHistory";
import {authenticate, checkAuthentication, IAuthenticate, ICurrent} from "../../../actions/current";
import {ThunkDispatch as Dispatch} from "redux-thunk";
import {connect} from "react-redux";

interface DispatchProps {
    onLogIn: (username: string) => void;
}

interface IRegState{
    firstName: string,
    lastName: string,
    birthday: number,
    email: string,
    phone: string,
    description: string,
    photo: string,
    studyGroup: string,
    starosta: boolean,
    userName: string,
    password: string,
    date: Date,
    passwordConfirm: string
}

export function validate(name: string, value: string){
    switch(name){
        case 'email': {
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(value).toLowerCase());
        }
        case 'phone': {
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

function RegistrationWindow({onLogIn}: DispatchProps){
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
    const [studyGroup, setGroup] = useState('');
    const [faculty, setFaculty] = useState('');
    const [cafedra, setCafedra] = useState('');

    function createUser(event: React.FormEvent<HTMLFormElement>){
        console.log("formSubmitted");
        const userForm = {
            first_name: firstName,
            last_name: lastName,
            birthday: birthday,
            email: email,
            phone: phone,
            description: description,
            photo: '/photo/test.png',
            studygroup: studyGroup,
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
                setGroup(event.target.value);
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
        }

        if(event.target.value === '') {
            isValid = true;
        }


    }

        return (
            <StyledRegistrationPage id={id} isValid={isValid}>
                <form action="">
                    <div className="registration-page__row">
                        <div className="registration-page__element">
                            Ваше имя
                            <input
                                id="firstName"
                                type="text"
                                name="firstName"
                                placeholder="First name"
                                value={firstName}
                                onChange={setData}
                                required
                            />
                            {
                                !firstName ? null :
                                    isValid ? null :
                                        id == 'firstName' ?
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
                                placeholder="Last name"
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
                                placeholder="Телефон"
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
                                placeholder="E-mail"
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
                       {(
                            isStudent ? <div className="registration-page__element">
                                            Группа
                                            <input
                                                id="studyGroup"
                                                type="text"
                                                name="studyGroup"
                                                placeholder="Группа"
                                                value={studyGroup}
                                                onChange={setData}
                                                required
                                            />
                                        </div> 
                            : null
                       )}
                    </div>
                    {(
                        isStudent ?
                            <div className="registration-page__row">
                                <div className="registration-page__element">
                                    Факультет
                                    <input
                                        id="faculty"
                                        type="text"
                                        name="faculty"
                                        placeholder="Факультет"
                                        value={faculty}
                                        onChange={setData}
                                        required
                                    />
                                </div>
                                <div className="registration-page__element">
                                    Кафедра
                                    <input
                                        id="cafedra"
                                        type="text"
                                        name="cafedra"
                                        placeholder="Кафедра"
                                        value={cafedra}
                                        onChange={setData}
                                        required
                                    />
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
