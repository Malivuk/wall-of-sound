import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import App from './App';
import Menu from '../Menu/Menu';
import Sample from '../Sample/Sample';
import Player from '../Player/Player';
import samples from '../../samples'

describe('<App />', () => {

  it('should render a <main />', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find('main')).to.have.length(1);
  });

  it('should render a <Menu />', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(Menu)).to.have.length(1);
  });

  it('rendered <Menu /> has no props', () => {
    const wrapper = mount(<App />);
    const menu = wrapper.find(Menu);
    expect(Object.keys(menu.props()).length).to.equal(0);
  });

  it('should render a <section />', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find('section')).to.have.length(1);
  });

  it('rendered <section /> has .samples class', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find('section').hasClass('samples')).to.equal(true);
  });

  it('should render multiple <Sample /> components', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(Sample)).to.have.length.above(1);
  });

  it('each rendered <Sample /> has two props', () => {
    const wrapper = mount(<App />);
    wrapper.find(Sample).forEach(function(node) {
      expect(Object.keys(node.props()).length).to.equal(2);
    });
  });

  it('should render a <Player />', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(Player)).to.have.length(1);
  });

  it('rendered <Player /> has one prop', () => {
    const wrapper = mount(<App />);
    const player = wrapper.find(Player);
    expect(Object.keys(player.props()).length).to.equal(1);
  });

  it('has a default sampleToPlay state set to samples[0]', () => {
    const wrapper = mount(<App />);
    expect(wrapper.state().sampleToPlay).to.equal(samples[0]);
  });

  it('calls componentWillMount', () => {
    sinon.spy(App.prototype, 'componentWillMount');
    const wrapper = mount(<App />);
    expect(App.prototype.componentWillMount.calledOnce).to.equal(true);
  });

});
