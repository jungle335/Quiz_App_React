import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Design from './pages/Design';
import RegisterMod from './modules/RegisterMod';
import LoginMod from './modules/LoginMod';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Quiz from './pages/Quiz';
import SearchMod from './pages/Search';

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path = "/quiz" component = {Quiz}/>
          <Route exact path = "/about" component = {About}/>
          <Route exact path = "/log-into" component = {LoginMod}/>
          <Route exact path = "/new-acc" component = {RegisterMod}/>
          <Route exact path = '/' component = {Design}/>
          {JSON.parse(sessionStorage.getItem('loggedUser')!) !== null ? <Route exact path = "/search" component = {SearchMod} /> : <NotFound/>}
          <Route exact path = '*' component = {NotFound}/>
        </Switch>
      </Router>
  )
}

export default App;
