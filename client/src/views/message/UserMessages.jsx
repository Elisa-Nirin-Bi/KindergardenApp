import React, { Component } from 'react';
import { getMessages, removeMessageById } from '../../services/messageapi';

import SingleUserMessage from './SingleUserMessage';
import Moment from 'react-moment';
export class UserMessages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }
  componentDidMount() {
    getMessages(this.props.match.params.id)
      .then((messages) => {
        this.setState({ messages });
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(this.props.match.params.id);
    setInterval(() => {
      getMessages(this.props.match.params.id)
        .then((messages) => {
          this.setState({ messages });
        })
        .catch((error) => {
          console.log(error);
        });
    }, 5 * 1000);
  }
  removeMessage = (e, msgId) => {
    e.preventDefault();
    const thisMsgId = msgId;
    removeMessageById(thisMsgId)
      .then(() => {
        console.log(msgId);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <div className="userMessages">
          <ul style={{ display: 'flex', flexDirection: 'column' }}>
            {this.state.messages.map((message) => {
              if (
                this.props.match.params.id === message.receiver._id &&
                message.sender._id === this.props.user._id
              ) {
                return (
                  <li
                    style={{
                      paddingTop: '50',
                      backgroundColor: '#61dafb'
                    }}
                    key={message.id}
                  >
                    {message.textBody}

                    <h5>
                      by {message.sender.name}
                      <br></br>
                      <Moment format="YYYY-MM-DD HH:mm">
                        {message.creationDate}
                      </Moment>
                    </h5>
                  </li>
                );
              } else if (
                this.props.match.params.id === message.sender._id &&
                message.receiver._id === this.props.user._id
              ) {
                return (
                  <li
                    style={{
                      paddingTop: '50',
                      backgroundColor: '#E3F2A9'
                    }}
                    key={message.id}
                  >
                    {message.textBody}

                    <h5>
                      by {message.sender.name}
                      <br></br>
                      <Moment format="YYYY-MM-DD HH:mm">
                        {message.creationDate}
                      </Moment>
                    </h5>
                  </li>
                );
              }
            })}
          </ul>
          <SingleUserMessage receiver={this.props.match} />
        </div>
      </div>
    );
  }
}

export default UserMessages;
