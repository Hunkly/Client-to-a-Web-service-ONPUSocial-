import React, {useEffect, useState} from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import Container from './shared/components/Container';
import Header from './shared/components/Header';
import HeaderProtected from './shared/components/HeaderProtected';
import UserPage from './pages/UserPage';
import GreetingPage from './pages/GreetingPage';
import AuthorizationPage from './pages/AuthorizationPage';
import RegistrationPage from "./pages/RegistrationPage";
import NewsPage from "./pages/NewsPage";
import Chat from "./shared/components/Chat";
import pathHistory from "./pathHistory";
import './App.css';
// import axios from "axios";
import { connect } from "react-redux";
import { checkAuthentication } from "./actions/current";
import { ICurrent } from "./actions/current";
import ProtectedRoute from './protected.route';

const About = () => <p>About Us</p>;
const Error = () => <p>404 NOT FOUND</p>;



interface IProps {
    checkAuthenticationConnect: () => void;
    isAuthenticated: boolean | null;
}

function App({ checkAuthenticationConnect, isAuthenticated}: IProps) {
    let auth = JSON.parse(localStorage.getItem('state') || "{}");
    const [logged, setLogged] = useState(auth.authenticated);
    const [toggle, setToggle] = useState(false);


    // function LoggedChange(){
    //     console.log('Сработала функция LoggedChange');
    //     setLogged(!logged);
    // }

    useEffect(
        () => {
            checkAuthenticationConnect();
            setToggle(!toggle);
            // axios({
            //     method: 'get',
            //     url: `http://localhost:9005/authuser`,
            //     withCredentials: true,
            //     headers: {
            //     "Access-Control-Allow-Credentials": true,
            //     "Access-Control-Allow-Origin": 'http://localhost:3000',
            //     'Accept': 'application/json',
            //     'Content-Type': 'x-www-form-urlencoded',
            //     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            // }
            // })
            // .then(res => {
            //     console.log('App HTTP request auth user', res.data);
            //     setLogged(true);
            //     })
            // .catch(error => {
            //     console.log(error);
            //     setLogged(false);
            // });
            // axios
            // .get(`http://localhost:9005/authusers`)
            // .then(res => {
            //     console.log('App HTTP request auth users', res.data);
            //     })
            // .catch(error => {
            // console.log(error);
            // });
        },[auth.authenticated]
    );
    return (
        <div className='App'>
            <Header/>
            <Container>
                <Router history={pathHistory}>
                    <Switch>
                        <ProtectedRoute path="/news" component={NewsPage} />
                        <ProtectedRoute path="/about-us" component={About} />
                        <ProtectedRoute path="/users/:id" component={UserPage} />
                        <Route exact={true} path="/" component={GreetingPage} />
                        <Route path="/auth/login" component={AuthorizationPage} />
                        <Route path="/auth/registration" component={RegistrationPage} />
                        <Route path="/chat" component={Chat} />
                        <Route path="*" component={Error} />
                    </Switch>
                </Router>
            </Container>
        </div>
    );
};

const mapStateToProps = (state: ICurrent) => ({
    isAuthenticated: state.isAuthenticated
});

const mapDispatchToProps = {
    checkAuthenticationConnect: checkAuthentication
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
