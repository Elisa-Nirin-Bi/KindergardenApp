import React from 'react';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';

const TeacherDashboard = (props) => {
  console.log('props4');
  console.log(props);
  console.log('props.user._id');
  console.log(props.user._id);
  return (
    <div className="teacher-board-div">
      <nav>
        {(props.user && (
          <>
            <span>Welcome teacher {props.user.name}, &nbsp;&nbsp; </span>
            <Link to="/">
              <HomeIcon />
            </Link>
            <a href={'/' + props.user._id + '/edit'}>
              {' '}
              <EditIcon />{' '}
            </a>
            <a href="/message/list">
              {' '}
              <ChatBubbleIcon />{' '}
            </a>
            <button className="logOutButton" onClick={props.onClick}>
              <LogoutIcon />
            </button>
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
