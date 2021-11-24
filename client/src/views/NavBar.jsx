import React from 'react';
import Subscription from './Subscription';
import { Link } from 'react-router-dom';
import ChildParents from './child/ChildParents';

const NavBar = (props) => {
  console.log('props8');
  console.log(props);

  return (
    <div>
      <nav>
        <Link to="/">
          <p>
            <h1>The Kindergarden App</h1>
          </p>
        </Link>
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
      </nav>
    </div>
  );
};

export default NavBar;
