import React, { Component } from 'react'
import Sound from 'react-sound';
import Slider from 'react-rangeslider'
import PropTypes from 'prop-types'
import ProgressBar from '../ProgressBar/ProgressBar'
import PlayIcon from '../../svg/ic_play_circle_filled_black_24px.svg'
import PauseIcon from '../../svg/ic_pause_circle_filled_black_24px.svg'
import 'react-rangeslider/lib/index.css'
import './Player.css'

export default class Player extends Component {
  state = {
    playerIcon: PauseIcon,
    playerVolume: 10,
    playerStatus: Sound.status.PLAYING,
    playerProgression: 0,
    playerTimer: 0,
    sliderValue: '',
  }

  playSample = () => {
    this.setState({
      playerStatus: Sound.status.PLAYING,
      playerIcon: PauseIcon,
    })
  }

  pauseSample = () => {
    this.setState({
      playerStatus: Sound.status.PAUSED,
      playerIcon: PlayIcon,
    })
  }

  handleSampleStatus = (e) => {
    e.preventDefault();
    this.state.playerStatus === Sound.status.PLAYING ? this.pauseSample() : this.playSample()
  }

  componentWillReceiveProps = (prevProps, prevState) => this.playSample()

  handleSampleFinishedPlaying = () => {
    this.setState({
      playerStatus: Sound.status.STOPPED,
      playerIcon: PlayIcon,
    })
  }

  handleSamplePlaying = (sample) => {
    this.setState({
      playerProgression: Math.floor((sample.position/sample.duration) * 100),
      playerTimer: Math.floor((sample.position/1000) % 60),
    })
  }

  handleVolume = (v) => this.setState({playerVolume: v})

  render() {
    return (
      <footer>
        <ProgressBar progression={this.state.playerProgression} timer={this.state.playerTimer} />

        <div className="player">
          <div className="player-part left">
            <p>{this.props.sample.title}</p>
            <p>00:0{this.state.playerTimer}</p>
          </div>

          <div className="player-part center">
            <a href="" onClick={this.handleSampleStatus}><img src={this.state.playerIcon} alt="Toggle sample" /></a>
          </div>

          <div className="player-part right">
            <Slider
            min={0}
            max={100}
            step={10}
            value={this.state.playerVolume}
            onChange={this.handleVolume}
            tooltip={false}
            />
          </div>

          <Sound
          url={this.props.sample.src}
          volume={this.state.playerVolume}
          playStatus={this.state.playerStatus}
          onPlaying={this.handleSamplePlaying}
          onFinishedPlaying={this.handleSampleFinishedPlaying}
          />
        </div>
      </footer>
    )
  }
}

Player.propTypes = {
  sample: PropTypes.object,
}
