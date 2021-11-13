import './App.css';
import { Route, Switch, Link } from 'react-router-dom';
import { Component } from 'react';
import TeacherSignUp from './TeacherSignUp';
import ParentSignUp from './ParentSignUp';
import ChildProfile from './ChildProfile';
import SignInPage from './SignInPage';
import TeacherUpdate from './TeacherEdit';
import ParentUpdate from './ParentUpdate';
import TeacherDashboard from './views/TeacherDashboard';
import ParentDashboard from './views/ParentDashboard';
import HomeIcon from '@mui/icons-material/Home';

import HomePage from './HomePage';
import PrivateRoute from './PrivateRoute';
import { signOut, loadAuthenticatedUser } from './services/authapi';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      active: false
    };
  }

  componentDidMount() {
    loadAuthenticatedUser()
      .then((user) => {
        if (user) {
          this.setState({ user });
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.setState({ active: true });
      });
  }

  handleAuthenticationChange = (user) => {
    this.setState({ user });
  };

  handleSignOut = () => {
    signOut().then(() => {
      this.setState({ user: null });
    });
  };
  render() {
    console.log('this.state.user');
    console.log(this.state.user);
    return (
      <div className="App">
        <nav>
          <Link to="/">
            <HomeIcon style={{ fontSize: '48px' }} />
          </Link>
        </nav>
        {(this.state.user &&
          ((this.state.user.role === 'teacher' && (
            <>
              <TeacherDashboard
                user={this.state.user}
                onClick={this.handleSignOut}
              />
            </>
          )) || (
            <>
              <ParentDashboard
                user={this.state.user}
                onClick={this.handleSignOut}
              />
            </>
          ))) || (
          <>
            <div className="div-access">
              <Link to="/sign-up">Teacher</Link>
              <Link to="/parent/sign-up">Parent</Link>
            </div>
          </>
        )}

        <Switch>
          <Route
            path="/sign-up"
            render={(props) => (
              <TeacherSignUp
                {...props}
                onAuthenticationChange={this.handleAuthenticationChange}
              />
            )}
          />
          <Route
            path="/:id/edit"
            render={(props) => (
              <TeacherUpdate
                {...props}
                onAuthenticationChange={this.handleAuthenticationChange}
              />
            )}
          />
          <Route
            path="/parent/:id/edit"
            render={(props) => (
              <ParentUpdate
                {...props}
                onAuthenticationChange={this.handleAuthenticationChange}
              />
            )}
          />
          <Route
            path="/parent/sign-up"
            render={(props) => (
              <ParentSignUp
                {...props}
                onAuthenticationChange={this.handleAuthenticationChange}
              />
            )}
          />
          <Route
            path="/sign-in"
            render={(props) => (
              <SignInPage
                {...props}
                onAuthenticationChange={this.handleAuthenticationChange}
              />
            )}
          />
          <Route
            path="/"
            element={
              <HomePage
                onAuthenticationChange={this.props.handleAuthenticationChange}
              />
            }
            exact
          />
          <PrivateRoute
            path="/child/:id"
            authorized={
              !this.state.active ||
              (this.state.user && this.state.user.role === 'teacher')
            }
            component={ChildProfile}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
