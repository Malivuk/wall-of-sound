import React, { Component } from 'react'
import $ from 'jquery';
import Logo from '../../svg/logo.svg'
import Add from '../../svg/ic_add_circle_white_24px.svg'
import Send from '../../svg/ic_send_white_24px.svg'
import api from '../../config'
import './Menu.css'

export default class Menu extends Component {
  state = {
    showOverlay: false,
    emailSent: false,
    emailSending: false,
    inputError: false,
    inputValue: '',
  }

  displayOverlay = (e) => {
    e.preventDefault();
    this.setState({showOverlay: !this.state.showOverlay})
  }

  handleInputValueChange = (event) => this.setState({inputValue: event.target.value})

  validateInput = () => this.state.inputValue ? this.callApi() : this.setState({inputError: true})

  succeesApi = () => {
    this.setState({
      emailSent: true,
      emailSending: false,
    })
  }

  errorApi = () => {
    this.setState({
      emailSent: false,
      emailSending: false,
    })
  }

  callApi = () => {
    this.setState({emailSending: true})
    $.ajax({
      url: api.API_ENDPOINT,
      type: 'POST',
      data: JSON.stringify({ 'url': this.state.inputValue }),
      dataType: 'json',
      headers: { 'x-api-key': api.API_KEY_VALUE },
      success: this.succeesApi,
      error: this.errorApi
    });
  }

  render() {
    const toggleDisplay = this.state.showOverlay ? 'active' : ''
    const toggleRotation = this.state.showOverlay ? 'rotated' : ''

    return (
      <header>
        <nav>
          <img src={Logo} alt="Logo" className="logo" />
          <h1>MisterMV sampler</h1>
          <a href="" onClick={this.displayOverlay} className={`add ${toggleRotation}`}><img src={Add} alt="Ajouter un sample" title="Ajouter un sample" /></a>
        </nav>
        <div className={`overlay ${toggleDisplay}`}>
          {this.state.emailSent ? (
            <div>
              <p className="feedback">L'email a bien été envoyé, merci 👍</p>
              <button className="close" onClick={this.displayOverlay}>FERMER</button>
            </div>
          ) : (
            <div>
              {this.state.emailSending ? (
                <div>
                  <p className="feedback">Envoi en cours...</p>
                  <div className="loader"></div>
                </div>
              ) : (
                <div>
                  <p className="feedback">Pour toute suggestion de sample, envoyez un lien YouTube (avec timer):</p>
                  <input type="text" placeholder="ex: https://youtu.be/J5tgkcNGwXY?t=23m46s" value={this.state.value} onChange={this.handleInputValueChange} />
                  <button className="send" onClick={this.validateInput}><img src={Send} alt="Envoyer un sample" title="Envoyer un sample" /></button>
                  {this.state.inputError &&
                    <p className="error">Ce champ doit être rempli.</p>
                  }
                </div>
              )}
            </div>
          )}
        </div>
      </header>
    )
  }
}
