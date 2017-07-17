import React, { Component } from 'react'
import ReactGA from 'react-ga';
import Menu from '../Menu/Menu'
import Sample from '../Sample/Sample'
import Player from '../Player/Player'
import samples from '../../samples'
import './App.css';

ReactGA.initialize('UA-99656730-1');

export default class App extends Component {
  // Ugly ugly... removing autoplay
  state = {sampleToPlay: {src: ''}}

  updateSample = (id) => this.setState({sampleToPlay: samples[id]})

  updateUrl = (id) => {
    window.location.hash = id
    this.updateSample(id)
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
  }

  componentWillMount() {
    const param = window.location.hash.split('#')[1]
    if(param) { this.updateSample(param) }
  }

  render() {
    return (
      <main>
        <Menu />
        <section className="samples">
          {samples.map((s) => <Sample updateSample={this.updateUrl} sample={s} key={s.index} />)}
        </section>
        <Player sample={this.state.sampleToPlay} />
      </main>
    );
  }
}
