import React, { Component } from 'react';
import { createChild } from '../../services/childapi';

class ChildCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      emergencyContactNumber: '',
      parent: ''
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
    console.log('this.props in handleFormSubmission');
    console.log(this.props);
    const { name, address, emergencyContactNumber, parent } = this.state;
    createChild({ name, address, emergencyContactNumber, parent })
      .then((user) => {
        this.props.history.push('/');
      })
      .catch((error) => {
        console.log(error);
        alert('There was an error creating the Child Profile');
      });
  };

  componentDidMount() {
    console.log('this.props insidedidmount');
    console.log(this.props);
  }

  componentDidUpdate() {
    console.log('this.props insidedidmountUpdate');
    console.log(this.props);
    let parent = this.props.user;
    console.log('parentUpdate');
    console.log(parent);
    if (parent !== this.state.parent) {
      this.setState({ parent });
    }
    console.log('this.state.parentUpdate');
    console.log(this.state.parent);
  }

  render() {
    console.log('this.user');
    console.log(this.user);
    console.log('this.props');
    console.log(this.props);
    console.log('this.state.parent');
    console.log(this.state.parent);
    console.log('this.state');
    console.log(this.state);
    return (
      <div>
        <h2>Child Here we know</h2>
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
