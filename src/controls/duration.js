import React from 'react';
import toVideoDuration from 'utils/duration';

export default class Duration extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="control-duration control-label">
        {toVideoDuration(this.props.duration)}
      </div>
    );
  }
}
