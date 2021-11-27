import React, { Component } from 'react';
import { getAllMessages } from '../../services/messageapi';
import { Link } from 'react-router-dom';
import { SpeechBubble } from 'react-kawaii';

export class InteractingUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
      count: 0
    };
  }
  componentDidMount() {
    getAllMessages()
      .then((messages) => {
        const conversations = messages
          .map((message) => {
            console.log(message.sender._id);
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
    console.log(this.state.conversations._id);

    return (
      <div className="interactingUsers">
        <p>
          <strong>Active Conversations {this.state.count}</strong>
        </p>
        <ul className="listInteractingUsers">
          {this.state.conversations.map((user) => {
            console.log(user._id);
            if (this.state.conversations._id === user._id) {
              return (
                <li className="interactingUsers-li" key={user._id}>
                  <Link to={`/message/user/${user._id}`}>
                    <strong>{user.name}</strong>
                    <SpeechBubble size={40} mood="happy" color="#fffaf0" />
                  </Link>
                </li>
              );
            } else {
              return <></>;
            }
          })}
        </ul>
      </div>
    );
  }
}

export default InteractingUsers;
