import React, { Component } from 'react';

import service from '../../services/notificationapi';

class CreateNotification extends Component {
  state = {
    message: '',
    imageUrl: ''
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append('imageUrl', e.target.files[0]);

    service
      .handleUpload(uploadData)
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
      .catch((err) => console.log('Error while adding the new file: ', err));
  };

  render() {
    return (
      <div>
        <h2>New Notification</h2>
        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
          <label>Message</label>
          <textarea
            type="text"
            name="message"
            value={this.state.message}
            onChange={this.handleChange}
          />
          <input type="file" onChange={this.handleFileUpload} />
          <button type="submit">Upload</button>
        </form>
      </div>
    );
  }
}

export default CreateNotification;
