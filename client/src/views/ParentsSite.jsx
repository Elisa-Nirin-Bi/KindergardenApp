import React from 'react';
import NavParent from './NavParent';
import ParentDashboard from './ParentDashboard';

const ParentsSite = (props) => {
  console.log('props TeacherSite');
  console.log(props);
  return (
    <div>
      <NavParent user={props.user} onClick={props.onClick} />
      <ParentDashboard user={props.user} onClick={props.onClick} />
    </div>
  );
};

export default ParentsSite;
