import React, { Component } from 'react';
import { getChild } from '../../services/childapi';
import service from '../../services/notificationapi';

class ChildProfile extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      name: null,
      address: null,
      emergencyContactNumber: null,
      parent: null,
      notifications: null
    };
  }

  componentDidMount() {
    getChild(this.props.match.params.id)
      .then((childinfo) => {
        const childToShow = childinfo.child;
        console.log('childToShow');
        console.log(childToShow);
        this.setState(() => {
          return {
            id: childToShow._id,
            name: childToShow.name,
            address: childToShow.address,
            emergencyContactNumber: childToShow.emergencyContactNumber,
            parent: childToShow.parent.name
          };
        });
        console.log('this.stateInsideComponent');
        console.log(this.state);
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
    console.log('this.state');
    console.log(this.state);
    return this.state.id ? (
      <div>
        <h2>Name: {this.state.name}</h2>
        <h3>Address: {this.state.address}</h3>
        <h3>Emergency Telephone: {this.state.emergencyContactNumber}</h3>
        <h3>Parent: {this.state.parent}</h3>
        <a href={`/child/${this.state.id}/upload`}>Create Notification</a>

        <div>
          <div>
            {this.state.notifications
              ? this.state.notifications
                  .filter((notification) => {
                    console.log('notification');
                    console.log(notification);
                    let currentChild = this.state.id;
                    console.log('currentChild');
                    console.log(currentChild);
                    if (notification.childProfile === currentChild) {
                      return notification;
                    }
                  })
                  .map((data) => {
                    console.log('data.image');
                    console.log(data.imageUrl);
                    return (
                      <div key={Math.random()}>
                        <p>
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
                        {data.creationDate}
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
