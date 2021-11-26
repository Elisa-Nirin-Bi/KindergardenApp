import React, { Component } from 'react';
import { getAllChildren } from '../../services/childapi';
import { removeChild } from '../../services/childapi';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
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
    console.log('this.props');
    console.log(this.props);

    return (
      <div>
        <h2>Our Children</h2>
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
              <div className="childName" key={child._id}>
                <h3>{child.name}</h3>
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
            );
          })}
      </div>
    );
  }
}

export default ChildList;
