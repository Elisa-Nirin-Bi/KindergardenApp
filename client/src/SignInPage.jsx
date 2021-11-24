import { Component } from 'react';
import { signIn } from './services/authapi';
import { Link } from 'react-router-dom';

class SignInPage extends Component {
  constructor() {
    super();
    this.state = {
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

  handleFormSubmission = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      const user = await signIn({ email, password });
      this.props.onAuthenticationChange(user);
      this.props.history.push('/');
      window.location.reload(false);
    } catch (error) {
      alert('There was an error signing in');
      console.log(error);
    }
  };

  render() {
    return (
      <div className="signIn-div">
        <h1>Sign In</h1>
        <form onSubmit={this.handleFormSubmission}>
          <label htmlFor="input-email">Email</label>
          <input
            id="input-email"
            type="email"
            placeholder="Your Email"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
          <label htmlFor="input-password">Password</label>
          <input
            id="input-password"
            type="password"
            placeholder="A Secure Password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
          <Link to="/">Not a user yet? Sign Up!</Link>
          <button>Sign In</button>
        </form>
      </div>
    );
  }
}

export default SignInPage;
