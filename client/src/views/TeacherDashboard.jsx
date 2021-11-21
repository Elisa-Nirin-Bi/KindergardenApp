import React from 'react';
import { Link } from 'react-router-dom';

const TeacherDashboard = (props) => {
  console.log('props4');
  console.log(props);
  console.log('props.user._id');
  console.log(props.user._id);
  return (
    <div>
      <nav>
        {(props.user && (
          <>
            <span>Welcome teacher {props.user.name}</span>
            <a href={'/' + props.user._id + '/edit'}>Edit Profile</a>
            <a href="/message/list">Messages</a>
            <button onClick={props.onClick}>Sign Out</button>
          </>
        )) || (
          <>
            <Link to="/sign-in">Sign In</Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default TeacherDashboard;
