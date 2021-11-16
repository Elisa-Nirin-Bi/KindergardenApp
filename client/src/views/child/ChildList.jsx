import React, { Component } from 'react';
import { getAllChildren } from '../../services/childapi';
import { removeChild } from '../../services/childapi';

class ChildList extends Component {
  constructor() {
    super();
    this.state = {
      children: [],
      searchTerm: ''
    };
  }

  loadChildren = () => {
    getAllChildren()
      .then((response) => {
        let valuesloaded = response;
        this.setState(() => {
          return { children: [...valuesloaded] };
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

  setSearchTerm = (val) => {
    let valueToPass = val;
    this.setState(() => {
      return { SearchTerm: valueToPass };
    });
  };

  render() {
    return (
      <div>
        <h2>Child List</h2>
        <input
          type="text"
          placeholder="Search ..."
          onChange={(event) => {
            this.setSearchTerm(event.target.value);
          }}
        />
        {this.state.children
          .filter((child) => {
            if (!this.state.SearchTerm) {
              return child;
            } else if (
              child.name
                .toLowerCase()
                .includes(this.state.SearchTerm.toLowerCase())
            ) {
              return child;
            } else {
              return null;
            }
          })
          .map((child) => {
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
                  onClick={(event) =>
                    this.removeSelectedChild(event, child._id)
                  }
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
