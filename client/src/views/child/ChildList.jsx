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
        let valuesloaded = response;
        console.log('valuesloaded');
        console.log(valuesloaded);
        this.setState(() => {
          return { childs: [...valuesloaded] };
        });
        console.log('this.state from ChildList');
        console.log(this.state);
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

  componentDidMount() {
    this.loadChildren();
  }

  render() {
    return (
      <div>
        <h2>Child List</h2>
        {this.state.childs.map((child) => {
          return (
            <div key={child._id}>
              {child.name}
              <button>
                <a href={'/child/' + child._id}>View Profile</a>
              </button>
              <button>
                <a href={'/child/' + child._id + '/edit/'}>
                  Edit Child Profile
                </a>
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ChildList;
