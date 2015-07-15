import React from 'react';
import toVideoDuration from 'utils/duration';

export default class Timestamp extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="control-timestamp control-label">
        {toVideoDuration(this.props.timestamp)}
      </div>
    );
  }
}
