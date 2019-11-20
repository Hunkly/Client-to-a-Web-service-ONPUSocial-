import React from 'react'
import StyledRegistrationPage from './RegistrationWindow.styled'
import Button from "../../../shared/components/Button";
import DatePicker from "react-datepicker";
import TextArea from "../../../shared/components/TextArea/TextArea.component";

import "react-datepicker/dist/react-datepicker.css";

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
    passwordConfirm: string,
    date: Date;
}

interface IRegProps {

}

export default class RegistrationWindow extends React.Component<IRegProps,IRegState>{
    constructor(props: IRegProps) {
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
            passwordConfirm: '',
            date: new Date()
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }


    handleDateChange = (date: Date) => {
        this.setState({
            date: date,
            birthday: date.valueOf()
        });
    };

    handleSubmit(event: React.FormEvent<HTMLFormElement>){
        console.log("formSubmitted");
        event.preventDefault();
    }

    public isValid = true;
    public id = '';
    handleChange(event: React.ChangeEvent<HTMLInputElement>){
        console.log('handleChange', event);
        // @ts-ignore
        this.setState({
            [event.target.name]: event.target.value
        });

        if(event.target.value === '') {
            this.isValid = true;
        }

        console.log(this.validate(event.target.name,event.target.value));
        this.isValid = this.validate(event.target.name,event.target.value);
        this.id = event.target.name;
    }

    validate(name: string, value: string){
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
            default: {
                return false;
            }
        }
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
                                onChange={this.handleChange}
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
                                onChange={this.handleChange}
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
                                onChange={this.handleDateChange}
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
                                onChange={this.handleChange}
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
                                onChange={this.handleChange}
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
                                onChange={this.handleChange}
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
                                onChange={this.handleChange}
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
                                onChange={this.handleChange}
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
                            <Button type='submit' color="#FB4141" activeColor="#FB4141">
                                Register
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