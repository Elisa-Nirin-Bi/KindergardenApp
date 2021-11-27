import React, { Component } from 'react';
import { getAllChildren } from '../../services/childapi';
import { removeChild } from '../../services/childapi';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';

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
    return (
      <div>
        <h2>Your children</h2>
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
              <div className="childParents" key={child._id}>
                <div className="childListNames">{child.name}</div>
                <div className="childButtons">
                  <button style={{ width: '40px' }}>
                    <a href={'/child/' + child._id}>
                      <PreviewIcon />
                    </a>
                  </button>
                  <button style={{ width: '40px' }}>
                    <a href={'/child/' + child._id + '/edit/'}>
                      <EditIcon />
                    </a>
                  </button>
                  <button
                    style={{ width: '40px' }}
                    onClick={(event) =>
                      this.removeSelectedChild(event, child._id)
                    }
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

export default ChildParents;
