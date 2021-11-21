import React, { Component } from 'react';
import { createUserMessage } from '../../services/messageapi';

export class SingleUserMessage extends Component {
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

    createUserMessage(this.props.receiver.params.id, {
      textBody,
      sender
    })
      .then((user) => {})
      .then(() => {
        Array.from(document.querySelector('input'));
        this.setState({
          textBody: ''
        });
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
        <div>
          <form>
            <input
              onChange={this.handleInputChange}
              name="textBody"
              value={this.state.textBody}
            ></input>
            <button onClick={this.handleFormSubmission}>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SingleUserMessage;
