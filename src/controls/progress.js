import React from 'react';
import toVideoDuration from 'utils/duration';

export default class Progress extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      hoverActive: false,
      hoverLeft: 0,
      hoverTimestamp: 0
    };
    
    this.renderTimestamp = this.renderTimestamp.bind(this);
  }
  
  onSeekClick(e) {
    let container = this.refs.progress.getDOMNode();
    let mousePosition = e.pageX;
    let seekPosition = (mousePosition - container.offsetLeft) / container.clientWidth;
    let seekTime = seekPosition * this.props.duration;
    
    this.setState({
      hoverActive: false,
      hoverLeft: 0,
      hoverTimestamp: 0
    });
    
    this.props.onSeek(seekTime);
  }
  
  onSeekOver(e) {
    e.stopPropagation();
    
    let container = this.refs.progress.getDOMNode();
    let mousePosition = e.pageX;
    let seekPosition = (mousePosition - container.offsetLeft) / container.clientWidth;
    let seekTime = seekPosition * this.props.duration;

    this.setState({
      hoverActive: true,
      hoverLeft: e.pageX,
      hoverTimestamp: seekTime
    });
  }
  
  onSeekOut() {
    this.setState({
      hoverActive: false,
      hoverLeft: 0,
      hoverTimestamp: 0
    });
  }
  
  renderTimestamp() {
    return (
      <div className="seeker-bar-timestamp">
        {toVideoDuration(this.state.hoverTimestamp)}
      </div>
    );
  }
  
  render() {
    return (
      <div className="control-seeker">
        <div className="seeker-bar-container"
          ref="progress"
          onMouseMove={this.onSeekOver.bind(this)}
          onMouseLeave={this.onSeekOut.bind(this)}
          onClick={this.onSeekClick.bind(this)}>
            {
              this.state.hoverActive ?
              this.renderTimestamp() :
              null
            }
            <div
              className="seeker-bar-buffer"
              style={{ width: this.props.buffered + '%' }}>
            </div>
            <div
              className="seeker-bar-current"
              style={{ width: this.props.progress + '%' }}>
            </div>
        </div>
      </div>
    );
  }
}
