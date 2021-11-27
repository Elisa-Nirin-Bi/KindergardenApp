import React from 'react';
import Subscription from './Subscription';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import CardMembershipIcon from '@mui/icons-material/CardMembership';

const ParentDashboard = (props) => {
  console.log('props5');
  console.log(props);
  console.log('props.user._id');
  console.log(props.user._id);

  return (
    <div className="menuParents">
      <span className="parentWelcome">
        Welcome parent {props.user.name},&nbsp;&nbsp;{' '}
      </span>
      <div className="divOfButtons">
        <Link to="/">
          <HomeIcon />
        </Link>
        <a href={'/subscription'}>
          <CardMembershipIcon />
        </a>
        <a href={'/parent/' + props.user._id + '/edit'}>
          {' '}
          <EditIcon />
        </a>
        <a href={'/child/create'}>
          <ChildCareIcon />
        </a>
        {/* <a href={'/message/list/' + props.user._id}>Messages</a> */}
        <a href="/message/list">
          {' '}
          <ChatBubbleIcon />{' '}
        </a>
        <button className="logOutButton" onClick={props.onClick}>
          <LogoutIcon />
        </button>
      </div>
    </div>
  );
};

export default ParentDashboard;
