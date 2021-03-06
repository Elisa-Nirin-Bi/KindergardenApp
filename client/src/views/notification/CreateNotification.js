import React, { Component } from 'react';

import service from '../../services/notificationapi';
import FileUploadIcon from '@mui/icons-material/FileUpload';

class CreateNotification extends Component {
  state = {
    message: '',
    imageUrl: '',
    creator: ''
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    console.log(this.props.user);

    this.setState({ [name]: value, creator: this.props.user });
    console.log(this.state);
  };

  handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append('imageUrl', e.target.files[0]);

    service
      .handleUpload(uploadData, this.props.match.params.id)

      .then((response) => {
        this.setState({ imageUrl: response.secure_url });
      })
      .catch((err) => console.log('Error while uploading the file: ', err));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    service
      .saveNewNotification(this.props.match.params.id, this.state)
      .then((res) => {
        console.log('added new file: ', res);
      })
      .then(() => {
        this.props.history.push('/');
      })
      .catch((err) => console.log('Error while adding the new file: ', err));
  };

  render() {
    return (
      <div className="notification-div">
        <h2>New Notification</h2>
        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
          <label>
            <strong>Message</strong>
          </label>
          <textarea
            type="text"
            name="message"
            value={this.state.message}
            onChange={this.handleChange}
          />
          <input type="file" onChange={this.handleFileUpload} />
          <button
            style={{ margin: 'auto' }}
            className="logOutButton"
            type="submit"
          >
            <FileUploadIcon />
          </button>
        </form>
      </div>
    );
  }
}

export default CreateNotification;
