/** @jsx nativeEvents */
import React, { Component, createRef } from 'react';
import nativeEvents from 'jsx-native-events';
import { observe, unobserve } from './lib';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.ref = createRef();
  }

  componentDidMount() {
    observe(this.ref.current);
  }

  componentWillUnmount() {
    unobserve(this.ref.current);
  }

  handleAppear(e) {
    console.log('appear', e);
  }

  handleDisappear(e) {
    console.log('disappear', e);
  }

  render() {
    return (
      <div>
        <div className="placeholder" />
        <div className="placeholder" />
        <div className="placeholder" />
        <div className="placeholder" />
        <div className="placeholder" />
        <div className="placeholder" />
        <div className="placeholder" />
        <div className="placeholder" />
        <div className="placeholder" />
        <div
          className="item"
          onEventAppear={this.handleAppear}
          onEventDisappear={this.handleDisappear}
          ref={this.ref}
        >
          appear and disappear
        </div>
        <div className="placeholder" />
        <div className="placeholder" />
        <div className="placeholder" />
        <div className="placeholder" />
        <div className="placeholder" />
        <div className="placeholder" />
        <div className="placeholder" />
        <div className="placeholder" />
        <div className="placeholder" />
      </div>
    );
  }
}
