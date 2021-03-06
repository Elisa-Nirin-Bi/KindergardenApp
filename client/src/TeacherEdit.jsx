import { Component } from 'react';
import { updateTeacher } from './services/authapi';

class TeacherUpdate extends Component {
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

    updateTeacher({ name, email, password, idUser })
      .then((user) => {
        this.props.onAuthenticationChange(user);
        this.props.history.push('/');
      })
      .catch((error) => {
        alert('There was an error editing');
      });
  };

  render() {
    let user;

    return (
      <div className="teacherSignUp-div">
        <h2>Edit Teacher Profile</h2>
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

export default TeacherUpdate;
