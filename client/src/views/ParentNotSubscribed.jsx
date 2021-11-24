import React from 'react';
import { Component } from 'react';
import Subscription from './Subscription';
import { Link } from 'react-router-dom';
import ChildParents from './child/ChildParents';
import { loadSubscription } from '../services/subscription';

class ParentNotSubscribed extends Component {
  constructor(props) {
    super();
    this.state = {
      user: props.user
    };
  }

  theCalling = () => {
    console.log('TIMEOUT CALLED');
    this.props.history.push('/');
    console.log('this.props after TIMEOUT');
    console.log(this.props);
  };

  componentDidMount() {
    // window.location.reload(false);
    setTimeout(() => this.theCalling(), 3000);
    this.props.history.push('/');
  }

  componentDidUpdate(previousProps) {
    if (previousProps !== this.props) {
      console.log('There are difference');
      console.log('this.props');
      console.log(this.props);
    }
  }

  render() {
    console.log('props9');
    console.log(this.props);
    console.log('props.user._id');
    console.log(this.props.user._id);
    return (
      <div>
        <nav>
          <Link to="/">
            <p>
              <h1>The Kindergarden App</h1>
            </p>
          </Link>
          <span>Welcome parent {this.props.user.name},</span>
          <button onClick={this.props.onClick}>Sign Out</button>
          <a href={'/subscription'}>Subscription</a>
          <button>
            <a href={'/parent/' + this.props.user._id + '/edit'}>
              Edit Profile
            </a>
          </button>
          {/* <button>
          <a href={'/child/create'}>Create Child</a>
        </button>
        <a href="/message/list">Messages</a> */}
        </nav>
        <div>
          <div>You are not subscribed.</div>
        </div>
      </div>
    );
  }
}

export default ParentNotSubscribed;
