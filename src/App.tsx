import React from 'react';
import {Provider} from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Container from './shared/components/Container';
import Header from './shared/components/Header';
import UserPage from './pages/UserPage';
import GreetingPage from './pages/GreetingPage';
import './App.css';
import Store from './store/store';

const News = () => <p>News</p>;
const About = () => <p>About Us</p>;


const App: React.FC = () => {

  return (
      <Provider store={Store}>
        <BrowserRouter>
         <Header/>
           <Container>
            <Switch>
             <Route exact={true} path="/" component={GreetingPage} />
             <Route path="/news" component={News} />
             <Route path="/about-us" component={About} />
             <Route path="/users/:id" component={UserPage} />
             {/*<Route path="/auth" component={AuthorizationWindow} />*/}
             {/*<Route path="/registration" component={RegistrationPage} />*/}
            </Switch>
           </Container>
        </BrowserRouter>
      </Provider>
  );
};

export default App;
