import React, { Component } from 'react';
import { getAllChildren } from '../../services/childapi';
import { removeChild } from '../../services/childapi';

class ChildParents extends Component {
  constructor(props) {
    super();
    this.state = {
      childs: [],
      parent: null
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
    const parent = this.props.user;
    this.setState({ parent });
    this.loadChildren();
  }

  render() {
    console.log('this.props');
    console.log(this.props);
    console.log('this.state');
    console.log(this.state);
    console.log('this.state.parent');
    console.log(this.state.parent);
    return (
      <div>
        <h2>Child List of the Parent</h2>
        {this.state.childs
          .filter((val) => {
            console.log('valInside');
            console.log(val);
            if (val.parent === this.state.parent._id) {
              return val;
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

export default ChildParents;
