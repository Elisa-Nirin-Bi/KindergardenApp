import React from 'react';
import { Component } from 'react';
// import Subscription from './Subscription';
import { Link } from 'react-router-dom';
// import ChildParents from './child/ChildParents';
// import { loadSubscription } from '../services/subscription';

class ParentNotSubscribed extends Component {
  constructor(props) {
    super();
    this.state = {
      user: props.user
    };
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
