import React, { Component } from 'react';
import { getChild } from '../../services/childapi';

class ChildProfile extends Component {
  constructor() {
    super();
    this.state = {
      child: null
    };
  }

  componentDidMount() {
    getChild(this.props.match.params.id)
      .then((child) => {
        const childinfo = child.child;
        this.setState(() => {
          return { child: childinfo };
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return this.state.child ? (
      <div>
        <h2>Name: {this.state.child.name}</h2>
        <h3>Address: {this.state.child.address}</h3>
        <h3>Emergency Telephone: {this.state.child.emergencyContactNumber}</h3>
        <h3>Parent: {this.state.child.parent}</h3>
        <a href={`/child/${this.state.child._id}/upload`}>Create </a>
      </div>
    ) : (
      <div></div>
    );
  }
}

export default ChildProfile;
