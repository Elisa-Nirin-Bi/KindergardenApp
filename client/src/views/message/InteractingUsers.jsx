import React, { Component } from 'react';
import { getAllMessages } from '../../services/messageapi';
import { Link } from 'react-router-dom';
import { SpeechBubble } from 'react-kawaii';

export class InteractingUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
      count: ''
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
          return { conversations, count: conversations.length };
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
                {user.name}
                <SpeechBubble size={40} mood="happy" color="#aee5ef" />
              </Link>
              {this.state.count}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default InteractingUsers;
