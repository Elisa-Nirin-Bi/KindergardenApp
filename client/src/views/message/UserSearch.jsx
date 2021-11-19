import React, { Component } from 'react';
import { getAllUsers } from '../../services/authapi';

export class UserSearch extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      searchTerm: ''
    };
  }

  searchUsers = () => {
    getAllUsers()
      .then((result) => {
        let myResult = result;
        this.setState(() => {
          return { users: [...myResult] };
        });
      })
      .catch((error) => {
        console.log(error);
        alert('We could not find your user!');
      });
  };

  nameToSearch = (name) => {
    this.searchUsers();
    let searchedName = name;
    this.setState(() => {
      return { SearchTerm: searchedName };
    });
  };

  render() {
    return (
      <div>
        <div>
          <h2>Find User</h2>
          <input
            type="text"
            onChange={(event) => {
              this.nameToSearch(event.target.value);
            }}
          />
          {this.state.users
            .filter((user) => {
              if (!this.state.SearchTerm) {
                return user;
              } else if (
                user.name
                  .toLowerCase()
                  .includes(this.state.SearchTerm.toLowerCase())
              ) {
                return user;
              } else {
                return null;
              }
            })
            .map((user) => {
              return (
                <div key={user._id}>
                  <a href={'/message/' + user._id}> {user.name}</a>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default UserSearch;
