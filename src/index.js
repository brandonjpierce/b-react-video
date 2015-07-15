import React from 'react';
import throttle from 'lodash.throttle';
import Controls from 'controls';

export default class Video extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      player: null,
      width: 0,
      duration: 0,
      playing: false,
      timestamp: 0,
      volume: 0,
      muted: false,
      buffered: 0
    };

    this.onThrottledResize = throttle(
      this.onContainerResize.bind(this),
      250
    );
  }

  componentWillMount() {
    window.addEventListener('resize', this.onThrottledResize);
  }

  componentDidMount() {
    let player = this.refs.player.getDOMNode();

    player.addEventListener(
      'loadedmetadata',
      this.onPlayerLoaded.bind(this),
      false
    );

    player.addEventListener(
      'timeupdate',
      this.onTimeUpdate.bind(this),
      false
    );
    
    player.addEventListener(
      'durationchange',
      this.onDurationChange.bind(this),
      false
    );
    
    player.addEventListener(
      'ended',
      this.onEnded.bind(this),
      false
    );
    
    player.addEventListener(
      'progress',
      this.onBuffer.bind(this),
      false
    );
  }

  onPlayerLoaded(e) {
    let player = this.refs.player.getDOMNode();
    let container = this.refs.container.getDOMNode();
    
    this.setState({
      ready: true,
      player: player,
      width: container.clientWidth,
      duration: e.target.duration,
      volume: e.target.volume,
      muted: e.target.muted
    });
  }
  
  onEnded() {
    this.setState({
      playing: false
    });
  }
  
  onDurationChange(e) {
    this.setState({
      duration: e.target.duration
    });
  }

  onContainerResize() {
    let container = this.refs.container.getDOMNode();
    
    this.setState({
      width: container.clientWidth
    });
  }

  onPlayback() {
    this.setState({
      playing: !this.state.playing
    });

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
      timestamp: e.target.currentTime,
      progress: Math.floor((100 / e.target.duration) * e.target.currentTime)
    });
  }
  
  onSeek(timestamp) {
    this.setState({
      timestamp: timestamp,
      progress: Math.floor((100 / this.state.duration) * timestamp)
    }, () => {
      this.state.player.currentTime = timestamp;
    });
  }
  
  onBuffer(e) {
    let player = e.target;
    
    if (player.buffered.length && this.state.buffered !== 100) {
      this.setState({
        buffered: player.buffered.end(0) / player.duration * 100
      }, () => {
        console.log(this.state);
      });
    }
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
          <Controls
            {...this.state}
            onPlayback={this.onPlayback.bind(this)}
            onSeek={this.onSeek.bind(this)}
          /> :
          null
        }
      </div>
    );
  }
}

React.render(
  <Video src="http://videos.thisisepic.com/2b9c1bf3-e19b-4be5-9d36-246c5d3607d8/high.mp4" type="mp4" />,
  document.getElementById('test-player')
);
