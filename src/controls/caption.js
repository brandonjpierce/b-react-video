import React from 'react';

export default class Captions extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="control-cc control-btn">
        <span className="fa fa-cc"></span>
      </div>
    );
  }
}
