import React from 'react';

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
      {/* <a href={'/message/list/' + props.user._id}>Messages</a> */}
      <a href="/message/list">Messages</a>
    </div>
  );
};

export default TeacherDashboard;
