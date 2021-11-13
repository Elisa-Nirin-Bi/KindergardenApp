import React, { Component } from 'react';
import { createChild } from '../../services/childapi';
import { Link } from 'react-router-dom';

class ChildCreate extends Component {
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
    createChild({ name, address, emergencyContactNumber })
      .then((user) => {
        this.props.history.push('/');
      })

      .catch((error) => {
        console.log(error);
        alert('There was an error creating the Child Profile');
      });
  };

  render() {
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
            <button>Create Child Profile</button>
          </form>
        </div>
      </div>
    );
  }
}

export default ChildCreate;
