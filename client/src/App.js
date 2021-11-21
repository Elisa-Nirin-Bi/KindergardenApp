import './App.css';
import { Route, Switch, Link } from 'react-router-dom';
import { Component } from 'react';
import TeacherSignUp from './TeacherSignUp';
import ParentSignUp from './ParentSignUp';
import ChildProfile from './views/child/ChildProfile';
import ChildEdit from './views/child/ChildEdit';
import ChildCreate from './views/child/ChildCreate';
import ChildList from './views/child/ChildList';
import CreateNotification from './views/notification/CreateNotification';
import ChildParents from './views/child/ChildParents';
import SubscriptionView from './views/Subscription';
import SignInPage from './SignInPage';
import TeacherUpdate from './TeacherEdit';
import ParentUpdate from './ParentUpdate';
import TeacherDashboard from './views/TeacherDashboard';
import ParentDashboard from './views/ParentDashboard';
import MessageBoard from './views/message/MessageBoard';

import SingleMessage from './views/message/SingleMessage';
import HomeIcon from '@mui/icons-material/Home';
import SingleUserMessage from './views/message/SingleUserMessage';
import HomePage from './HomePage';
import PrivateRoute from './PrivateRoute';
import { signOut, loadAuthenticatedUser } from './services/authapi';
import UserSearch from './views/message/UserSearch';
import InteractingUsers from './views/message/InteractingUsers';
import UserMessages from './views/message/UserMessages';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      active: false
    };
  }

  componentDidMount() {
    this.loadUser();
  }

  loadUser = () => {
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
  };

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
            component={
              this.state.user && this.state.user.role === 'teacher'
                ? ChildList
                : this.state.user && this.state.user.role === 'parent'
                ? (props) => <ChildParents user={this.state.user} />
                : HomePage
            }
            onAuthenticationChange={this.handleAuthenticationChange}
            exact
          />
          <Route
            path="/child/:id/upload"
            render={(props) => (
              <CreateNotification
                {...props}
                onAuthenticationChange={this.handleAuthenticationChange}
              />
            )}
          />
          <Route
            path="/child/:id/create-notification"
            render={(props) => (
              <CreateNotification
                {...props}
                onAuthenticationChange={this.handleAuthenticationChange}
              />
            )}
          />
          <PrivateRoute
            path="/child/create"
            authorized={
              !this.state.active ||
              (this.state.user && this.state.user.role === 'parent')
            }
            render={(props) => (
              <ChildCreate user={this.state.user} {...props} />
            )}
            exact
          />
          <PrivateRoute
            path="/child/list"
            authorized={
              !this.state.active ||
              (this.state.user && this.state.user.role === 'teacher')
            }
            component={ChildList}
            exact
          />
          <PrivateRoute
            path="/message/list"
            authorized={!this.state.active || this.state.user}
            render={(props) => (
              <MessageBoard {...props} user={this.state.user} />
            )}
            exact
          />
          <PrivateRoute
            path="/message/list/:id"
            authorized={!this.state.active || this.state.user}
            render={(props) => (
              <InteractingUsers user={this.state.user} {...props} />
            )}
          />
          <PrivateRoute
            path="/message/:id"
            authorized={!this.state.active || this.state.user}
            render={(props) => (
              <SingleMessage user={this.state.user} {...props} />
            )}
            exact
          />

          <PrivateRoute
            path="/message/user/:id"
            authorized={!this.state.active || this.state.user}
            render={(props) => (
              <UserMessages user={this.state.user} {...props} />
            )}
          />

          <PrivateRoute
            path="/message/user/create/:id"
            authorized={!this.state.active || this.state.user}
            render={(props) => (
              <SingleUserMessage user={this.state.user} {...props} />
            )}
          />

          <PrivateRoute
            path="/users"
            authorized={!this.state.active || this.state.user}
            component={UserSearch}
            exact
          />

          <PrivateRoute
            path="/child/:id/edit"
            authorized={!this.state.active || this.state.user}
            component={ChildEdit}
          />
          <PrivateRoute
            path="/child/:id"
            authorized={!this.state.active || this.state.user}
            render={(props) => (
              <ChildProfile user={this.state.user} {...props} />
            )}
          />
          <PrivateRoute
            path="/subscription"
            redirect="/sign-up"
            authorized={
              !this.state.loaded ||
              (this.state.user && this.state.user.role === 'viewer')
            }
            render={(props) => (
              <SubscriptionView {...props} onUserRefresh={this.loadUser} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
