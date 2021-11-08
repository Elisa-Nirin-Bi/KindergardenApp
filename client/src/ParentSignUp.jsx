import { Component } from 'react';
import { parentSignUp } from './services/authapi';
import { Link } from 'react-router-dom';

class ParentSignUp extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: ''
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
    const { name, email, password } = this.state;
    parentSignUp({ name, email, password, role: 'parent' })
      .then((user) => {
        this.props.onAuthenticationChange(user);
        this.props.history.push('/sign-in');
      })

      .catch((error) => {
        console.log(error);
        alert('There was an error signing up');
      });
  };

  render() {
    return (
      <div className="parentSignUp-div">
        <h1>I am a Parent</h1>
        <form onSubmit={this.handleFormSubmission}>
          <label htmlFor="input-name">Name</label>
          <input
            id="input-name"
            type="text"
            placeholder="Add Your First and Last Name"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
          />
          <label htmlFor="input-email">Email</label>
          <input
            id="input-email"
            type="email"
            placeholder="Add Your Email"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
          <label htmlFor="input-password">Password</label>
          <input
            id="input-password"
            type="password"
            placeholder="Choose A Password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
          <button>Sign Up</button>
        </form>
        <div className="user-div">
          <Link to="/sign-in">Already a user? Sign In!</Link>
        </div>
      </div>
    );
  }
}

export default ParentSignUp;
