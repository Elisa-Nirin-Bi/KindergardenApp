import React, { Component } from 'react';
import { getAllMessages } from '../../services/messageapi';
import { Link } from 'react-router-dom';
import { SpeechBubble } from 'react-kawaii';

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
      });
  }

  render() {
    return (
      <div className="interactingUsers">
        <ul>
          {this.state.conversations.map((user) => (
            <li className="interactingUsers-li" key={user._id}>
              <Link to={`/message/user/${user._id}`}>
                {user.name}{' '}
                <SpeechBubble size={40} mood="happy" color="#aee5ef" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default InteractingUsers;
