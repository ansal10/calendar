import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import CalendarMonth from "./components/CalendarMonth";
import Reminder from './components/ReminderDetails'
import {ToastContainer, ToastStore} from 'react-toasts';


class App extends Component {

  getHighLightElement(){
    const x = "Hello world";
    const  y = x + "Hello";
    return (
        <p>
          Edit <code>src/App.js</code> to start working
        </p>
    )
  }

  render() {
    return (
      <div className="App">
        <ToastContainer store={ToastStore}/>
        <BrowserRouter>
          <Switch>
            <Route exact path='/reminder/new' component={Reminder}/>
            <Route exact path='/reminder/:uuid' component={Reminder}/>
            <Route exact path='/reminder/:uuid/:action' component={Reminder}/>
            <Route exact path='/' component={CalendarMonth} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
