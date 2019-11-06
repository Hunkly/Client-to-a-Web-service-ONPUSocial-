import React from 'react'
import StyledRegistrationPage from './RegistrationWindow.styled'
import Button from "../../../shared/components/Button";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface IRegState{
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    password_confirm: string,
    phone: string,
    birthday: number,
    description: string;
    date: Date;
}

interface IRegProps {

}

const year = [
    {
        id: 1,
        month: 'January',
        day: 31

    },
    {
        id: 2,
        month: 'February',
        day: 28
    },
    {
        id: 3,
        month: 'March',
        day: 31
    },
    {
        id: 4,
        month: 'April',
        day: 30
    },
    {
        id: 5,
        month: 'May',
        day: 31
    },
    {
        id: 6,
        month: 'June',
        day: 30
    },
    {
        id: 7,
        month: 'Jule',
        day: 31
    },
    {
        id: 8,
        month: 'August',
        day: 31
    },
    {
        id: 9,
        month: 'September',
        day: 30
    },
    {
        id: 10,
        month: 'October',
        day: 31
    },
    {
        id: 11,
        month: 'November',
        day: 30
    },
    {
        id: 12,
        month: 'December',
        day: 31
    },
];

export default class RegistrationWindow extends React.Component<IRegProps,IRegState>{
    constructor(props: IRegProps) {
        super(props);

        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            password_confirm: '',
            phone: '',
            birthday: 0,
            description: '',
            date: new Date()
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.dateChange = this.dateChange.bind(this);
    }

    dateChange = (date: Date) => {
        this.setState({
            date: date
        });
    };

    handleSubmit(event: React.FormEvent<HTMLFormElement>){
        console.log("formSubmitted");
        event.preventDefault();
    }

    // handleChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>){
    handleChange(event: any){
        console.log('handleChange', event);
        // @ts-ignore
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log('state', this.state);
    }

    birthdayConvert(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> ){
        let day = event.target.name
    }

    render() {
        return (
            <StyledRegistrationPage>
                <form action="">
                    <div className="registration-page__row">
                        <div className="registration-page__element">
                            Your first name
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First name"
                                value={this.state.firstName}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div className="registration-page__element">
                            Your last name
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last name"
                                value={this.state.lastName}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="registration-page__row">
                        <div className="registration-page__element">
                            Your e-mail
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div className="registration-page__element">
                            Your phone
                            <input
                                type="password"
                                name="phone"
                                placeholder="Phone"
                                value={this.state.phone}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="registration-page__row">
                        <div className="registration-page__element">
                            Date of birth
                            <div className="registration-page__element__container">
                            {/*    <input*/}
                            {/*        className="registration-page__birthday-input"*/}
                            {/*        type="number"*/}
                            {/*        name="day"*/}
                            {/*        placeholder="Day"*/}
                            {/*        value={this.state.birthday}*/}
                            {/*        onChange={this.birthdayConvert}*/}
                            {/*        required*/}
                            {/*    />*/}
                            {/*    <select name="birthday" onChange={this.birthdayConvert}>*/}
                            {/*        {*/}
                            {/*            year.map(({month, id}) =>*/}
                            {/*             <option value={id}>{month}</option>*/}
                            {/*            )*/}
                            {/*        }*/}
                            {/*    </select>*/}
                            {/*    <input*/}
                            {/*        className="registration-page__birthday-input"*/}
                            {/*        type="number"*/}
                            {/*        name="birthday"*/}
                            {/*        placeholder="Year"*/}
                            {/*        value={this.state.birthday}*/}
                            {/*        onChange={this.birthdayConvert}*/}
                            {/*        required*/}
                            {/*    />*/}
                            {/*</div>*/}
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.dateChange}
                            />
                            </div>
                        </div>
                    </div>
                    <div className="registration-page__row">
                        <div className="registration-page__element">
                            Password
                            <input
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
                                type="password"
                                name="password_confirm"
                                placeholder="Confirm password"
                                value={this.state.password_confirm}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="registration-page__row">
                        <div className="registration-page__element">
                            Something about you
                            <input
                                type="text"
                                name="description"
                                placeholder="Description"
                                value={this.state.description}
                                onChange={this.handleChange}
                                required
                            />
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