import React, { Component } from 'react';
import './App.css';

import { BrowserRouter,Route, Switch, Redirect } from 'react-router-dom';

import Login from '../src/components/Login';
import NavigationDrawer from '../src/components/NavigationDrawer';
import NewTask from '../src/components/NewTask';
import UserProfile from '../src/components/UserProfile';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
    this.signOff = this.signOff.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  async componentDidMount() {
    if (localStorage.getItem('isLoggedIn')) {
      this.setState({ isLoggedIn: true });
    } else {
      this.setState({ isLoggedIn: false });
    }
  }

  async signOff() {
    await localStorage.setItem('isLoggedIn', false)

    this.setState({ isLoggedIn: false });
  }

  signIn() {
    this.setState({ isLoggedIn: true });
  }

  render() {

    const NewTaskView = () => (
      <NewTask />
    );

    const NewUserProfile = () => (
      <UserProfile />
    );

    const LoginView = () => (
      <Login signIn={this.signIn} />
    );

    const NavigationDrawerView = () => (
      <NavigationDrawer signOff={this.signOff}/>
    );

    return (
      <BrowserRouter basename="/tasks">
        <div className="App">
            <div>
              {console.log("isslogged: ",localStorage.getItem("isLoggedIn"))}
              {!this.state.isLoggedIn && localStorage.getItem("isLoggedIn") === "false" ? <Redirect to="/login" /> : null}
              {localStorage.getItem("isLoggedIn") === null && <Redirect to="/login" />}
              <Switch>
                <Route exact path="/login" component={LoginView} />
                <Route exact path="/dashboard" component={NavigationDrawerView} />
                <Route exact path="/dashboard/newtask" component={NewTaskView} /> 
                <Route exact path="/dashboard/newuserprofile" component={NewUserProfile} />
              </Switch>
            </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
