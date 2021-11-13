import React, { Component } from 'react';
import { getAllChildren } from '../../services/childapi';

class ChildList extends Component {
  constructor() {
    super();
    this.state = {
      childs: []
    };
  }

  loadChildren = () => {
    getAllChildren()
      .then((response) => {
        console.log('response');
        console.log(response);
        this.setState((response) => {
          return { childs: [response.data] };
        });
      })
      .catch((error) => {
        console.log(error);
        alert('There was an error loading children list.');
      });
  };
  // updateParent({ name, email, password, idUser })
  // .then((user) => {
  //   this.props.onAuthenticationChange(user);
  //   this.props.history.push('/');
  // })
  // .catch((error) => {
  //   console.log(error);
  //   alert('There was an error editing');
  // });

  render() {
    this.loadChildren();
    console.log('this.state from ChildList');
    console.log(this.state);
    return (
      <div>
        <h2>Child List</h2>
      </div>
    );
  }
}

export default ChildList;
