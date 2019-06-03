import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Container from './shared/components/Container';
import Header from './shared/components/Header';
import UserPage from './pages/UserPage';
import Publications from './pages/UserPage/Publications';
import GreetingPage from './pages/GreetingPage';
import './App.css';

const Home = () => <p>Home</p>;
const News = () => <p>News</p>;
const About = () => <p>About Us</p>;


const App: React.FC = () => {
  return (
    <BrowserRouter>
     <Header/>
       <Container>
        <Switch>
         <Route exact={true} path="/" component={GreetingPage} />
         <Route path="/news" component={News} />
         <Route path="/about-us" component={About} />
         <Route path="/users/:id" component={UserPage} />
        </Switch>
       </Container>
    </BrowserRouter>
  );
}

export default App;
