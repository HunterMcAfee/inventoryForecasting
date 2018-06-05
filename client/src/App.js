import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DataEntry from './components/DataEntry';
import Navbar from './components/Navbar';
import Forecast from './components/Forecast';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={Navbar} />
          <Route exact path="/forecast" component={Forecast} />
        </div>
      </Router>
    );
  }
}

export default App;
