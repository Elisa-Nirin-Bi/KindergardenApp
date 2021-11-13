import { Component } from 'react';
import { updateParent } from './services/authapi';

class ParentUpdate extends Component {
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
    const idUser = this.props.match.params.id;
    console.log('idUser');
    console.log(idUser);
    updateParent({ name, email, password, idUser })
      .then((user) => {
        this.props.onAuthenticationChange(user);
        this.props.history.push('/');
      })
      .catch((error) => {
        console.log(error);
        alert('There was an error editing');
      });
  };

  render() {
    console.log(' I reached here');
    console.log('this.props6');
    console.log(this.props);
    let user;
    console.log('user');
    console.log(user);
    return (
      <div className="teacherSignUp-div">
        <h2>Edit Parent Profile</h2>
        <form onSubmit={this.handleFormSubmission}>
          <label htmlFor="input-name">Name</label>
          <input
            id="input-name"
            type="text"
            placeholder={this.state.name}
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
          <button>Update</button>
        </form>
      </div>
    );
  }
}

export default ParentUpdate;
