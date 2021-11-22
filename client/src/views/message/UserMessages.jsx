import React, { Component } from 'react';
import { getMessages } from '../../services/messageapi';
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

  render() {
    return (
      <div>
        <div className="userMessages">
          <ul>
            {this.state.messages.map((message) => {
              if (
                this.props.match.params.id === message.receiver._id &&
                message.sender._id === this.props.user._id
              ) {
                return (
                  <li style={{ paddingTop: '50' }} key={message.id}>
                    {message.textBody}
                    <p>
                      <h3>{message.sender.name}</h3>
                      <Moment format="YYYY-MM-DD HH:mm">
                        {message.creationDate}
                      </Moment>
                    </p>
                  </li>
                );
              } else if (
                this.props.match.params.id === message.sender._id &&
                message.receiver._id === this.props.user._id
              ) {
                return (
                  <li style={{ paddingTop: '50' }} key={message.id}>
                    {message.textBody}
                    <p>
                      <h3>by {message.sender.name}</h3>
                      <Moment format="YYYY-MM-DD HH:mm">
                        {message.creationDate}
                      </Moment>
                    </p>
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
