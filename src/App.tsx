import React from 'react';
import {Provider} from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';
import Container from './shared/components/Container';
import Header from './shared/components/Header';
import UserPage from './pages/UserPage';
import GreetingPage from './pages/GreetingPage';
import AuthorizationPage from './pages/AuthorizationPage';
import RegistrationPage from "./pages/RegistrationPage";
import pathHistory from "./pathHistory";
import './App.css';
import Store from './store/store';

const News = () => <p>News</p>;
const About = () => <p>About Us</p>;


const App: React.FC = () => {

  return (
      <Provider store={Store}>
        <Router history={pathHistory}>
         <Header/>
           <Container>
            <Switch>
             <Route exact={true} path="/" component={GreetingPage} />
             <Route path="/news" component={News} />
             <Route path="/about-us" component={About} />
             <Route path="/users/:id" component={UserPage} />
             <Route path="/auth" component={AuthorizationPage} />
             <Route path="/signup" component={RegistrationPage} />
            </Switch>
           </Container>
        </Router>
      </Provider>
  );
};

export default App;
