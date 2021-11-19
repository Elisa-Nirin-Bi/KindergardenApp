import React, { Component } from 'react';
import SingleMessage from './SingleMessage';
import UserSearch from './UserSearch';

export class Message extends Component {
  render() {
    return (
      <div>
        <UserSearch />
        <SingleMessage />
      </div>
    );
  }
}

export default Message;
