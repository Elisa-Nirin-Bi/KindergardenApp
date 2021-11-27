import React, { Component } from 'react';
import { createChild } from '../../services/childapi';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

class ChildCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      emergencyContactNumber: '',
      parent: '',
      genre: ''
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

    const { name, address, emergencyContactNumber, genre, parent } = this.state;
    createChild({ name, address, emergencyContactNumber, genre, parent })
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
    return (
      <div>
        <div className="teacherSignUp-div">
          <h2>Add Your Child</h2>
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
            <label htmlFor="input-genre">Boy or Girl?</label>
            <input
              id="input-genre"
              type="text"
              placeholder="Boy or Girl?"
              name="genre"
              value={this.state.genre}
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

            <button style={{ margin: 'auto' }} className="logOutButton">
              <ThumbUpAltIcon />
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default ChildCreate;
