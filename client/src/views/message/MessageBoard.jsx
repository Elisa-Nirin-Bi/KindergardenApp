import React, { Component } from 'react';
import InteractingUsers from './InteractingUsers';

import UserSearch from './UserSearch';

export class MessageBoard extends Component {
  render() {
    return (
      <div>
        <UserSearch />

        <InteractingUsers user={this.props.user} />
      </div>
    );
  }
}

export default MessageBoard;
