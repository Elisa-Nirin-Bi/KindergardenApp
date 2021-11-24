import React from 'react';
import Subscription from './Subscription';
import { Link } from 'react-router-dom';
import ChildParents from './child/ChildParents';

const NavTeacher = (props) => {
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
        <span>Welcome teacher {props.user.name}, </span>
        <a href={'/' + props.user._id + '/edit'}> Eddit Profile </a>
        <a href="/message/list"> Messages </a>
        <button onClick={props.onClick}> Sign Out</button>
      </nav>
    </div>
  );
};

export default NavTeacher;
