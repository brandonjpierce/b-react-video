import React from 'react';
import throttle from 'lodash.throttle';
import toVideoDuration from 'utils/duration';

export default class Video extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      player: null,
      width: 0,
      duration: 0,
      playing: false,
      timestamp: '00:00',
      volume: 0,
      muted: false
    }

    this.onThrottledResize = throttle(
      this.onContainerResize.bind(this),
      250
    );

    this.renderControls = this.renderControls.bind(this);
  }

  componentWillMount() {
    window.addEventListener('resize', this.onThrottledResize);
  }

  componentDidMount() {
    let player = this.refs.player.getDOMNode();

    player.addEventListener(
      'loadedmetadata',
      this.onPlayerLoaded.bind(this, player),
      false
    );

    player.addEventListener(
      'timeupdate',
      this.onTimeUpdate.bind(this),
      false
    );
  }

  onPlayerLoaded(player, e) {
    let container = this.refs.container.getDOMNode();

    this.setState({
      ready: true,
      player: player,
      width: container.clientWidth,
      duration: toVideoDuration(e.target.duration),
      volume: e.target.volume,
      muted: e.target.muted
    });
  }

  onContainerResize() {
    let container = this.refs.container.getDOMNode();
    this.setState({ width: container.clientWidth });
  }

  onPlayPause() {
    this.setState({ playing: !this.state.playing });

    let method = this.state.playing ? 'pause' : 'play';
    this.state.player[method]();
  }

  onMuteUnmute() {
    this.setState({ muted: !this.state.muted }, () => {
      this.state.player.muted = this.state.muted;
    });
  }

  onTimeUpdate(e) {
    this.setState({
      timestamp: toVideoDuration(e.target.currentTime),
      progress: Math.floor((100 / e.target.duration) * e.target.currentTime)
    });
  }

  renderControls() {
    let playPauseIcon = this.state.playing ?
      <span className="fa fa-pause"></span> :
      <span className="fa fa-play"></span>;

    let muteUnmuteIcon = this.state.muted ?
      <span className="fa fa-volume-off"></span> :
      <span className="fa fa-volume-up"></span>;

    return (
      <div className="video-controls cf">
        <div className="control-playpause control-btn" onClick={this.onPlayPause.bind(this)}>
          {playPauseIcon}
        </div>
        <div className="control-timestamp control-label">
          {this.state.timestamp}
        </div>
        <div className="control-seeker">
          <div className="seeker-bar-container">
            <div className="seeker-bar-current" style={{
              width: this.state.progress + '%'
            }}></div>
          </div>
        </div>
        <div className="control-duration control-label">
          {this.state.duration}
        </div>
        <div className="control-cc control-btn">
          <span className="fa fa-cc"></span>
        </div>
        <div className="control-sound control-btn" onClick={this.onMuteUnmute.bind(this)}>
          {muteUnmuteIcon}
        </div>
        <div className="control-fullscreen control-btn">
          <span className="fa fa-expand"></span>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="video-container" ref="container">
        <div className="video-media-container">
          <video src={this.props.src} ref="player" width={this.state.width}>
            <source src={this.props.src} poster={this.props.poster} type={this.props.type} />
          </video>
        </div>
        {
          this.state.ready ?
          this.renderControls() :
          null
        }
      </div>
    );
  }
}

React.render(
  <Video src="http://video-js.zencoder.com/oceans-clip.mp4" type="mp4" />,
  document.getElementById('test-player')
);
