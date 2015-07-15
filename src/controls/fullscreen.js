import React from 'react';

export default class Fullscreen extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="control-fullscreen control-btn">
        <span className="fa fa-expand"></span>
      </div>
    );
  }
}
