import React, { Component } from 'react';
import { createMessage } from '../../services/messageapi';

export class SingleMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textBody: '',
      sender: ''
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
    const { textBody, sender } = this.state;

    createMessage(this.props.match.params.id, {
      textBody,
      sender
    })
      .then((user) => {
        this.props.history.push(`/messages/${this.props.match.params.id}`);
      })
      .catch((error) => {
        console.log(error);
        alert('There was an error creating the message');
      });
  };
  componentDidMount() {
    let sender = this.props.user;

    if (sender !== this.state.sender) {
      this.setState({ sender });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmission}>
          <input
            onChange={this.handleInputChange}
            name="textBody"
            value={this.state.textBody}
          ></input>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default SingleMessage;
