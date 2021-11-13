import React from 'react';
import ChildList from './child/ChildList';

const TeacherDashboard = (props) => {
  console.log('props4');
  console.log(props);
  console.log('props.user._id');
  console.log(props.user._id);
  return (
    <div>
      <span>Welcome teacher {props.user.name}</span>
      <button onClick={props.onClick}>Sign Out</button>
      <button>
        <a href={'/' + props.user._id + '/edit'}>Edit Profile</a>
      </button>
      <div>
        <ChildList></ChildList>
      </div>
    </div>
  );
};

export default TeacherDashboard;
