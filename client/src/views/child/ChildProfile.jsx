import React, { Component } from 'react';
import { getChild } from '../../services/childapi';
import service from '../../services/notificationapi';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import HomeIcon from '@mui/icons-material/Home';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import CampaignIcon from '@mui/icons-material/Campaign';
import Profile from '../../styles/images/profile.png';
import ArchiveIcon from '@mui/icons-material/Archive';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

class ChildProfile extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      name: null,
      address: null,
      emergencyContactNumber: null,
      parent: null,
      parentId: null,
      notifications: null
    };
  }

  componentDidMount() {
    getChild(this.props.match.params.id)
      .then((childinfo) => {
        console.log(this.props.user._id);
        const childToShow = childinfo.child;

        this.setState(() => {
          return {
            id: childToShow._id,
            name: childToShow.name,
            address: childToShow.address,
            emergencyContactNumber: childToShow.emergencyContactNumber,
            parent: childToShow.parent.name,
            parentId: childToShow.parent._id
          };
        });

        service
          .getAllNotifications(childToShow._id)
          .then((response) => {
            const notifications = response;
            this.setState({ notifications });
          })
          .catch((error) => {
            alert('There was an error loading notifications of the child');
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return this.state.id ? (
      <div>
        <div className="mainProfile">
          <h2>{this.state.name}</h2>

          {(this.props.user.role === 'teacher' && (
            <>
              <a href={`/child/${this.state.id}/upload`}>
                <ArchiveIcon />
              </a>
              <Link to={`/message/user/${this.state.parentId}`}>
                <ChatBubbleIcon />
              </Link>
            </>
          )) || (
            <>
              <Link to={`/message/user/${this.state.parentId}`}>
                <ChatBubbleIcon />
              </Link>
            </>
          )}
          <div className="profile">
            <div className="imgProfile">
              <img src={Profile} alt="child" />
            </div>

            <div className="detailsProfile">
              <h5>
                <HomeIcon /> {this.state.address}
                <br></br>
                <PhoneIphoneIcon /> {this.state.emergencyContactNumber}
                <br></br>
                <FamilyRestroomIcon /> {this.state.parent}
              </h5>
              {(this.props.user.role === 'teacher' && <></>) || <></>}
              {(this.props.user.role === 'parent' && (
                <>
                  <Link to="/subscription">
                    <p>Subscription</p>
                  </Link>
                </>
              )) || <></>}
            </div>
          </div>
        </div>
        <div>
          <div className="childProfile-div">
            {this.state.notifications
              ? this.state.notifications
                  .filter((notification) => {
                    let currentChild = this.state.id;

                    if (notification.childProfile === currentChild) {
                      return notification;
                    }
                  })
                  .map((data) => {
                    return (
                      <div key={Math.random()}>
                        <p>
                          <br></br>
                          <CampaignIcon />
                          <br></br>
                          {data.message}

                          <br></br>
                          {data.imageUrl !== '' ? (
                            <img
                              src={data.imageUrl}
                              style={{ width: 150 }}
                              alt="notification"
                            />
                          ) : null}
                        </p>
                        <Moment format="YYYY-MM-DD HH:mm">
                          {data.creationDate}
                        </Moment>
                      </div>
                    );
                  })
              : null}
          </div>
        </div>
      </div>
    ) : (
      <div>No profile found</div>
    );
  }
}

export default ChildProfile;
