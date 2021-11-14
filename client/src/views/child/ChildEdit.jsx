import React, { Component } from 'react';
import { editChild } from '../../services/childapi';
import { getChild } from '../../services/childapi';

class ChildEdit extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      address: '',
      emergencyContactNumber: ''
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmission = (event) => {
    event.preventDefault();
    console.log('this.state');
    console.log(this.state);
    const { name, address, emergencyContactNumber } = this.state;
    editChild(this.props.match.params.id, {
      name,
      address,
      emergencyContactNumber
    })
      .then(() => {
        this.props.history.push('/');
      })

      .catch((error) => {
        console.log(error);
        alert('There was an error editing the Child Profile');
      });
  };

  componentDidMount() {
    getChild(this.props.match.params.id)
      .then((childinfo) => {
        const infoChildLoaded = childinfo.child;
        console.log('infoChildLoaded');
        console.log(infoChildLoaded);
        this.setState(() => {
          return {
            name: infoChildLoaded.name,
            address: infoChildLoaded.address,
            emergencyContactNumber: infoChildLoaded.emergencyContactNumber
          };
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    console.log('this.props');
    console.log(this.props);
    return (
      <div>
        <h2>Child Here</h2>
        <div className="teacherSignUp-div">
          <form onSubmit={this.handleFormSubmission}>
            <label htmlFor="input-name">Name</label>
            <input
              id="input-name"
              type="text"
              placeholder="First and Last Name of the Child"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
            <label htmlFor="input-address">Address</label>
            <input
              id="input-address"
              type="text"
              placeholder="Address"
              name="address"
              value={this.state.address}
              onChange={this.handleInputChange}
            />
            <label htmlFor="emergencyContactNumber">
              Emergency Contact Number
            </label>
            <input
              id="emergencyContactNumber"
              type="text"
              placeholder="Your Phone Number"
              name="emergencyContactNumber"
              value={this.state.emergencyContactNumber}
              onChange={this.handleInputChange}
            />
            <button>Edit Child Profile</button>
          </form>
        </div>
      </div>
    );
  }
}

export default ChildEdit;
