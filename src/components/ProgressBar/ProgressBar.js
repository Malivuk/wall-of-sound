import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ProgressBar.css'

export default class ProgressBar extends Component {
  render() {
    return (
      <div className="progressbar">
        <div style={{ width: this.props.progression + '%' }} className="innerbar"></div>
      </div>
    )
  }
}

ProgressBar.propTypes = {
  progression: PropTypes.number.isRequired,
}
