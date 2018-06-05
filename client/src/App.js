import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DataEntry from './components/DataEntry';
import Navbar from './components/Navbar';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={Navbar} />
      </Router>
    );
  }
}

export default App;
