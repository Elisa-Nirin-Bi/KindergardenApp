import React, { Component } from 'react';
import { getAllMessages } from '../../services/messageapi';
import { Link } from 'react-router-dom';

export class InteractingUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: []
    };
  }

  componentDidMount() {
    getAllMessages()
      .then((messages) => {
        const conversations = messages
          .map((message) => {
            return message.receiver._id === this.props.user._id
              ? message.sender
              : message.receiver;
          })
          .filter((user, index, originalUsers) => {
            return (
              originalUsers.findIndex((item) => item._id === user._id) === index
            );
          });
        this.setState(() => {
          return { conversations };
        });
      })
      .catch((error) => {
        console.log(error);
        alert('We could not find your user!');
      });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.conversations.map((user) => (
            <li key={user._id}>
              <Link to={`/message/user/${user._id}`}>{user.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default InteractingUsers;
