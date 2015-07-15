import React from 'react';
import Duration from 'controls/duration';
import Fullscreen from 'controls/fullscreen';
import Playback from 'controls/playback';
import Progress from 'controls/progress';
import Timestamp from 'controls/timestamp';
import Caption from 'controls/caption';

export default class Controls extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let muteUnmuteIcon = this.props.muted ?
      <span className="fa fa-volume-off"></span> :
      <span className="fa fa-volume-up"></span>;

    return (
      <div className="video-controls cf" ref="progress">
        <Playback playing={this.props.playing} onPlayback={this.props.onPlayback} />
        <Timestamp timestamp={this.props.timestamp} />
        <Progress
          buffered={this.props.buffered}
          duration={this.props.duration}
          width={this.props.width}
          progress={this.props.progress}
          onSeek={this.props.onSeek} />
        <Duration duration={this.props.duration} />
        <Caption />
        <div className="control-sound control-btn">
          {muteUnmuteIcon}
        </div>
        <Fullscreen />
      </div>
    );
  }
}
