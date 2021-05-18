import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Components/Home'
import Login from './Components/Login'
import SignUp from './Components/SignUp'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" component= {Home} exact/>
      <Route path="/Login" component= {Login}/>
      <Route path="/SignUp" component= {SignUp}/> 
      <Route component= {() => {<div>Pagina não encontrada!</div>}}/> 
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);


