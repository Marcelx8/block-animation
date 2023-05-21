import React, { Component } from 'react';
import './App.css';
import BouncingBlock from './components/BouncingBlock';

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <BouncingBlock />
      </React.Fragment>
    );
  }
}
