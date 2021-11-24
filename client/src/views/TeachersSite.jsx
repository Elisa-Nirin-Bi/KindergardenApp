import React from 'react';
import NavTeacher from './NavTeacher';
import TeacherDashboard from './TeacherDashboard';

const TeacherSite = (props) => {
  console.log('props TeacherSite');
  console.log(props);
  return (
    <div>
      <NavTeacher user={props.user} onClick={props.onClick} />
      <TeacherDashboard user={props.user} onClick={props.onClick} />
    </div>
  );
};

export default TeacherSite;
