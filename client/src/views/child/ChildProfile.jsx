import React, { Component } from 'react';
import { getChild } from '../../services/childapi';

class ChildProfile extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      name: null,
      address: null,
      emergencyContactNumber: null,
      parent: null
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
      </div>
    ) : (
      <div></div>
    );
  }
}

export default ChildProfile;
