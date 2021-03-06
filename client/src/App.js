import './App.scss';
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

import SingleUserMessage from './views/message/SingleUserMessage';
import HomePage from './HomePage';
import PrivateRoute from './PrivateRoute';
import { signOut, loadAuthenticatedUser } from './services/authapi';
import UserSearch from './views/message/UserSearch';
import InteractingUsers from './views/message/InteractingUsers';
import UserMessages from './views/message/UserMessages';
// import { red } from '@mui/material/colors';
import { loadSubscription } from './services/subscription';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      active: false,
      subscription: null
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
      .then(() => {
        console.log('this.state.user inside loaduser');
        console.log(this.state.user);
        console.log(this.state.user._id);
        loadSubscription(this.state.user._id)
          .then((response) => {
            console.log('response from loadingSubscription');
            console.log(response);
            if (response !== null) {
              console.log('response.active');
              console.log(response.active);
              this.setState({ subscription: response.active });
            }
          })
          .catch((error) => {
            alert('error loadinng subscription status');
            console.log(error);
          });
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
      this.setState({ user: null, subscription: null });
    });
  };
  render() {
    console.log('this.state.user');
    console.log(this.state.user);
    console.log('this.props');
    console.log(this.props);

    return (
      <div className="App">
        <div className="nav-div">
          <Link to="/">
            <div>
              <h1>The Kindergarden App</h1>
            </div>
          </Link>

          {(this.state.user &&
            this.state.active &&
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
                <Link to="/sign-up">
                  <h3>Teacher</h3>
                </Link>
                <Link to="/parent/sign-up">
                  <h3>Parent</h3>
                </Link>
                <Link to="/sign-in">
                  <h3>Log In</h3>
                </Link>
              </div>
            </>
          )}
        </div>
        <div className="bottomPart">
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
                  onClick={this.handleSignOut}
                  onAuthenticationChange={this.handleAuthenticationChange}
                />
              )}
            />
            <Route
              path="/"
              component={
                this.state.user && this.state.user.role === 'teacher'
                  ? ChildList
                  : this.state.user &&
                    this.state.user.role === 'parent' &&
                    this.state.subscription === true
                  ? (props) => (
                      <ChildParents
                        user={this.state.user}
                        onClick={this.handleSignOut}
                        {...props}
                      />
                    )
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
                  user={this.state.user}
                  onClick={this.handleSignOut}
                  onAuthenticationChange={this.handleAuthenticationChange}
                />
              )}
            />
            <Route
              path="/child/:id/create-notification"
              render={(props) => (
                <CreateNotification
                  {...props}
                  user={this.state.user}
                  onClick={this.handleSignOut}
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
                <ChildCreate
                  user={this.state.user}
                  onClick={this.handleSignOut}
                  {...props}
                />
              )}
              exact
            />
            <PrivateRoute
              path="/child/list"
              authorized={
                !this.state.active ||
                (this.state.user && this.state.user.role === 'teacher')
              }
              render={(props) => (
                <ChildList
                  {...props}
                  onClick={this.handleSignOut}
                  user={this.state.user}
                />
              )}
              exact
            />
            <PrivateRoute
              path="/message/list"
              authorized={!this.state.active || this.state.user}
              render={(props) => (
                <MessageBoard
                  {...props}
                  onClick={this.handleSignOut}
                  user={this.state.user}
                />
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
              authorized={
                !this.state.active ||
                (this.state.user && this.state.user.role === 'parent')
              }
              render={(props) => (
                <SubscriptionView {...props} onUserRefresh={this.loadUser} />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
