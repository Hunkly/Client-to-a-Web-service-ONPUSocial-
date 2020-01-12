import React from 'react';
import { Provider } from 'react-redux';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import Container from './shared/components/Container';
import Header from './shared/components/Header';
import UserPage from './pages/UserPage';
import GreetingPage from './pages/GreetingPage';
import AuthorizationPage from './pages/AuthorizationPage';
import RegistrationPage from "./pages/RegistrationPage";
import NewsPage from "./pages/NewsPage";
import pathHistory from "./pathHistory";
import './App.css';
import Store from './store/store';

const About = () => <p>About Us</p>;
const userLocalData = JSON.parse(localStorage.getItem('state') || "{}");

const App: React.FC = () => {

  return (
      <div className='App'>
          <Provider store={Store}>
            <Router history={pathHistory}>
             <Header/>
               <Container>
                    {
                        userLocalData.isLogged ?
                            <Switch>
                                <Route exact={true} path="/news" component={NewsPage} />
                                <Route path="/about-us" component={About} />
                                <Route path="/users/:id" component={UserPage} />
                                <Redirect to='/news' />
                            </Switch>
                             :
                            <Switch>
                                <Route exact={true} path="/" component={GreetingPage} />
                                <Route path="/auth/login" component={AuthorizationPage} />
                                <Route path="/auth/registration" component={RegistrationPage} />
                                <Redirect to='/' />
                            </Switch>
                    }
               </Container>
            </Router>
          </Provider>
      </div>
  );
};

export default App;
