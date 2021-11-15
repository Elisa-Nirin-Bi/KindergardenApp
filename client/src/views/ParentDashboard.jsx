import React from 'react';

const ParentDashboard = (props) => {
  console.log('props5');
  console.log(props);
  console.log('props.user._id');
  console.log(props.user._id);

  return (
    <div>
      <span>Welcome parent {props.user.name}</span>
      <button onClick={props.onClick}>Sign Out</button>
      <button>
        <a href={'/parent/' + props.user._id + '/edit'}>Edit Profile</a>
      </button>
      <button>
        <a href={'/child/create'}>Create Child</a>
      </button>
    </div>
  );
};

export default ParentDashboard;
