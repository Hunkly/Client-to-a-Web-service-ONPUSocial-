import React, {useEffect} from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Container from './shared/components/Container';
import Header from './shared/components/Header';
import UserPage from './pages/UserPage';
import GreetingPage from './pages/GreetingPage';
import AuthorizationPage from './pages/AuthorizationPage';
import RegistrationPage from "./pages/RegistrationPage";
import NewsPage from "./pages/NewsPage";
import ChatPage from "./pages/ChatPage";
import Chat from "./shared/components/Chat";
import pathHistory from "./pathHistory";
import './App.css';
import { connect } from "react-redux";
import { checkAuthentication } from "./actions/current";
import { ICurrent } from "./actions/current";
import ProtectedRoute from './protected.route';

const About = () => <p>About Us</p>;
const Error = () => <p>404 NOT FOUND</p>;



interface IProps {
    checkAuthenticationConnect: () => void;
}

function App({ checkAuthenticationConnect}: IProps) {
    let auth = JSON.parse(localStorage.getItem('state') || "{}");
    // const [toggle, setToggle] = useState(false);

    useEffect(
        () => {
            checkAuthenticationConnect();
            // setToggle(!toggle);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        },[auth.authenticated]
    );
    return (
        <div className='App'>
            <Header/>
            <Container>
                <Router history={pathHistory}>
                    <Switch>
                        <ProtectedRoute path="/users/:id" component={UserPage} />
                        <ProtectedRoute path="/news" component={NewsPage} />
                        <ProtectedRoute path="/about-us" component={About} />
                        <Route path="/auth/login" component={AuthorizationPage} />
                        <Route path="/auth/registration" component={RegistrationPage} />
                        <ProtectedRoute path="/chat" component={ChatPage} />
                        <Route exact={true} path="/" component={GreetingPage} />
                        <Route path="*" component={Error} />
                    </Switch>
                </Router>
            </Container>
        </div>
    );
}

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
