import React, { Component } from 'react';
import { getAllChildren } from '../../services/childapi';
import { removeChild } from '../../services/childapi';

class Child extends Component {
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
          {
            this.state.user &&
              ((this.state.user.name === this.state.child.parentName && (
                <>
                  <p>{child.name}</p>
                </>
              )) || <></>);
          }
        })}
      </div>
    );
  }
}

export default Child;
