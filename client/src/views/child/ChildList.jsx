import React, { Component } from 'react';
import { getAllChildren } from '../../services/childapi';
import { removeChild } from '../../services/childapi';

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
        let valuesloaded = response;
        this.setState(() => {
          return { childs: [...valuesloaded] };
        });
      })
      .catch((error) => {
        console.log(error);
        alert('There was an error loading children list.');
      });
  };

  removeSelectedChild = (event, childId) => {
    event.preventDefault();
    const idChildToRemove = childId;
    removeChild(idChildToRemove)
      .then(() => {
        window.location.reload(false);
      })
      .catch((error) => {
        alert('there was an error deleting the child profile.');
        console.log(error);
      });
  };

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
              <button
                onClick={(event) => this.removeSelectedChild(event, child._id)}
              >
                Remove Child
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ChildList;
