import React, { Component } from 'react';
import './App.css';
import SiteBar from './home/Navbar';
import Auth from './auth/Auth';
import WorkoutIndex from './workouts/WorkoutIndex';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { AuthContext } from './auth/AuthContext';


class App extends Component {
  constructor() {
    super();
    this.setToken = (token) => {
      localStorage.setItem('token', token);
      this.setState({sessionToken: token})
    }
    this.state = {
      sessionToken: '',
      setToken: this.setToken
    }
  }

  componentWillMount() {
    const token = localStorage.getItem('token');
    if (token && !this.state.sessionToken) { 
      this.setState({ sessionToken: token });
    }
  }

  logout = () => {
    this.setState({ 
      sessionToken: '', 
    });
    localStorage.clear();
  }

  setSessionState = (token) => {
    localStorage.setItem('token', token);
    this.setState({ sessionToken: token });
  }

  protectedViews = () => {
    if (this.state.sessionToken === localStorage.getItem('token')) {
      return (
        <Switch>
          <Route path='/' exact>
            <WorkoutIndex />
          </Route>
        </Switch>
      )
    } else {
      return (
        <Route path="/auth" >
          <Auth />
        </Route>
      )
    }
  }

  render(){
    return(
      <Router>
        <AuthContext.Provider value={this.state}>
        <div>
          <SiteBar clickLogout={this.logout}/>
          {this.protectedViews()}
        </div>
        </AuthContext.Provider>
      </Router>
    );
  }
}

export default App;
