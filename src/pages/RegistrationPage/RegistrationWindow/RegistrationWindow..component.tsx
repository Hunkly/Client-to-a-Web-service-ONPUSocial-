import React from 'react'
import StyledRegistrationPage from './RegistrationWindow.styled'
import Button from "../../../shared/components/Button";
import DatePicker from "react-datepicker";
import TextArea from "../../../shared/components/TextArea/TextArea.component";
import {logIn, showRegWindow} from "../../../store/currentSession/actions";
import axios from 'axios';

import "react-datepicker/dist/react-datepicker.css";
import {saveState} from "../../../store/localStorage";
import pathHistory from "../../../pathHistory";
import {CurrentSession} from "../../../store/currentSession/actionTypes";
import {connect} from "react-redux";

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

interface IRegProps {

}

interface DispatchProps {
    onLogIn: (session: CurrentSession) => void,
    onGetData: (url: string, props: any) => void
}

type Props = IRegProps & DispatchProps;

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

class RegistrationWindow extends React.Component<Props,IRegState>{
    constructor(props: Props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            birthday: 0,
            email: '',
            phone: '',
            description: '',
            photo: '',
            studyGroup: '',
            starosta: false,
            userName: '',
            password: '',
            date: new Date(),
            passwordConfirm: ''
        };

        this.createUser = this.createUser.bind(this);
        this.setData = this.setData.bind(this);
        this.setDate = this.setDate.bind(this);
    }


    setDate = (date: Date) => {
        this.setState({
            birthday: date.valueOf()
        });
    };

    createUser(event: React.FormEvent<HTMLFormElement>){
        console.log("formSubmitted");
        const userForm = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            birthday: this.state.birthday,
            email: this.state.email,
            phone: this.state.phone,
            description: this.state.description,
            photo: '/photo/test.png',
            studygroup: null,
            starosta: null,
            username: this.state.userName,
            password: this.state.password
        };
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
                axios({
                    method: 'get',
                    url: `http://localhost:9005/login?login=${this.state.userName}&password=${this.state.password}`,
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
                        this.props.onLogIn({
                            isLogged: res.data,
                            signUp: false,
                            account: {
                                login: this.state.userName,
                                password: this.state.password
                            }
                        });
                        saveState({
                            isLogged: res.data,
                            signUp: false,
                            account: {login: this.state.userName, password: this.state.password}
                        });
                        pathHistory.push(`/users/${this.state.userName}`)
                    })
                    .catch(error => {
                        console.log('ON GET DATA, error', error.response.data);
                    });
            })
            .catch(error => {
              console.log(error.message);
            });
        event.preventDefault();
    }

    public isValid = true;
    public id = '';
    setData(event: React.ChangeEvent<HTMLInputElement>){
        console.log('handleChange', event);
        // @ts-ignore
        this.setState({
            [event.target.name]: event.target.value
        });

        if(event.target.value === '') {
            this.isValid = true;
        }

        console.log(validate(event.target.name,event.target.value));
        this.isValid = validate(event.target.name,event.target.value);
        this.id = event.target.name;
    }

    pushToAddress(event: React.ChangeEvent<HTMLButtonElement>){
        return pathHistory.push(event.target.value);
    }



    render() {
        return (
            <StyledRegistrationPage id={this.id} isValid={this.isValid}>
                <form action="">
                    <div className="registration-page__row">
                        <div className="registration-page__element">
                            Your first name
                            <input
                                id="firstName"
                                type="text"
                                name="firstName"
                                placeholder="First name"
                                value={this.state.firstName}
                                onChange={this.setData}
                                required
                            />
                            {
                                !this.state.firstName ? null :
                                    this.isValid ? null :
                                        this.id === 'firstName' ?
                                            <div className="registration-page__additional-text">
                                                Data is incorrect
                                            </div> : null
                            }
                        </div>
                        <div className="registration-page__element">
                            Your last name
                            <input
                                id="lastName"
                                type="text"
                                name="lastName"
                                placeholder="Last name"
                                value={this.state.lastName}
                                onChange={this.setData}
                                required
                            />
                            {
                                this.isValid || !this.state.lastName ? null :
                                    this.id === 'lastName' ?
                                        <div className="registration-page__additional-text">
                                            Data is incorrect
                                        </div> : null
                            }
                        </div>
                    </div>

                    <div className="registration-page__row">
                        <div className="registration-page__element">
                            Date of birth
                            <DatePicker
                                startDate={null}
                                className="registration-window__date-picker"
                                selected={this.state.date}
                                onChange={this.setDate}
                            />
                        </div>
                        <div className="registration-page__element">
                            Your phone
                            <input
                                id="phone"
                                type="text"
                                name="phone"
                                placeholder="Phone"
                                value={this.state.phone}
                                onChange={this.setData}
                                required
                            />
                            {
                                this.isValid || !this.state.phone ? null :
                                 this.id === 'phone' ?
                                     <div className="registration-page__additional-text">
                                        Data is incorrect
                                     </div> : null
                            }
                        </div>
                    </div>
                    <div className="registration-page__row">
                        <div className="registration-page__element">
                            Your e-mail
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={this.setData}
                                required
                            />
                            {
                                this.isValid || !this.state.email ? null :
                                    this.id === 'email' ?
                                        <div className="registration-page__additional-text">
                                            Data is incorrect
                                        </div> : null
                            }
                        </div>
                    </div>
                    <div className="registration-page__row">
                        <div className="registration-page__element">
                            Password
                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.setData}
                                required
                            />
                        </div>
                        <div className="registration-page__element">
                            Repeat the password
                            <input
                                id="passwordConfirm"
                                type="password"
                                name="passwordConfirm"
                                placeholder="Confirm password"
                                value={this.state.passwordConfirm}
                                onChange={this.setData}
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
                            User name
                            <input
                                id="userName"
                                type="text"
                                name="userName"
                                placeholder="User name"
                                value={this.state.userName}
                                onChange={this.setData}
                                required
                            />
                        </div>
                    </div>
                    <div className="registration-page__row">
                        <div className="registration-page__element">
                            Something about you
                            <TextArea
                                id="description"
                                name='description'
                                placeholder="Description"
                                value={this.state.description}
                                onChange={this.setData}
                                maxLength={200}
                                required={true}
                            />
                            {
                                this.state.description.length<200 ? null :
                                    <div className="registration-page__additional-text">
                                        Data is too long
                                    </div>
                        }
                        </div>
                    </div>
                    <div className="registration-page__row">
                        <div className="registration-page__element">
                            <Button
                                onClick={this.createUser}
                                color="#3E76BB"
                                activeColor="#3E76BB"
                            >
                                Register
                            </Button>
                        </div>
                        <div className="registration-page__element">
                            <Button
                                onClick={this.pushToAddress}
                                color="#FB4141"
                                activeColor="#FB4141"
                                value='/'
                            >
                                Go back
                            </Button>
                        </div>
                        <div>
                        </div>
                    </div>
                </form>
            </StyledRegistrationPage>
        );
    }
}

    function mapStateToProps(state: CurrentSession){
        return {
            isLogged: state.isLogged,
            account: {
                login: state.account.login,
                password: state.account.password
            }
        }
    }

    function mapDispatchToProps(dispatch: any): DispatchProps{
        return {
            onLogIn: async (session: CurrentSession) => {
                await dispatch(logIn(session));
                //console.log('Login completed [UI]')
            },
            onGetData: async (url: string, props: any) => {
                axios
                    .get(url)
                    .then(res => {
                        console.log('ON GET DATA, getDataSuccess', res);
                        // dispatch(getDataSuccess(res.data));
                        return res.data;
                    })
                    .catch(error => {
                        console.log('ON GET DATA, error', error);
                        // dispatch(errorHandlerActions.handleHTTPError(error, props));
                        return error;
                    })
            }
        }
    }

    export default connect(mapStateToProps, mapDispatchToProps)(RegistrationWindow)