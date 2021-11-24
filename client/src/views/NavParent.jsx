import React from 'react';
import Subscription from './Subscription';
import { Link } from 'react-router-dom';
import ChildParents from './child/ChildParents';

const NavParent = (props) => {
  console.log('props3');
  console.log(props);

  return (
    <div>
      <nav>
        <Link to="/">
          <p>
            <h1>The Kindergarden App</h1>
          </p>
        </Link>
        <span>Welcome parent {props.user.name},</span>
        <button onClick={props.onClick}>Sign Out</button>
        <a href={'/subscription'}>Subscription</a>
        <button>
          <a href={'/parent/' + props.user._id + '/edit'}>Edit Profile</a>
        </button>
        <button>
          <a href={'/child/create'}>Create Child</a>
        </button>
        {/* <a href={'/message/list/' + props.user._id}>Messages</a> */}
        <a href="/message/list">Messages</a>
      </nav>
    </div>
  );
};

export default NavParent;
