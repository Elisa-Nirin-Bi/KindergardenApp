import React, { Component } from 'react';
import background from './6162.jpg';
export class HomePage extends Component {
  render() {
    return (
      <div
        className="Homepage"
        style={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: 'no-repeat',
          width: '800px'
        }}
      ></div>
    );
  }
}

export default HomePage;
