import React, { Component } from 'react'
import PropTypes from 'prop-types'
import copy from 'copy-to-clipboard';
import PlayIcon from '../../svg/ic_play_circle_outline_black_24px.svg'
import CopyIcon from '../../svg/ic_content_copy_black_24px.svg'
import './Sample.css'

export default class Sample extends Component {

  copyToClipboard = () => copy(window.location.origin + '/#' + this.props.sample.index)

  render() {
    return (
      <article className="sample">
        <button className="action copy" onClick={this.copyToClipboard}>
          <img src={CopyIcon} alt="Copier le lien" title="Copier le lien" />
        </button>
        <button className="action play" onClick={() => this.props.updateSample(this.props.sample.index)}>
          <img src={PlayIcon} alt="Jouer le sample" title="Jouer le sample" />
        </button>
        <p className="title">{this.props.sample.title}</p>
        <p className="length">{this.props.sample.length}</p>
      </article>
    )
  }
}

Sample.propTypes = {
  updateSample: PropTypes.func.isRequired,
  sample: PropTypes.object.isRequired,
}
