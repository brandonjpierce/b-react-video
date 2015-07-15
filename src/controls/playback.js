import React from 'react';

export default class Playback extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let playbackIcon = this.props.playing ?
      <span className="fa fa-pause"></span> :
      <span className="fa fa-play"></span>;
    
    return (
      <div className="control-playpause control-btn" onClick={this.props.onPlayback}>
        {playbackIcon}
      </div>
    );
  }
}
