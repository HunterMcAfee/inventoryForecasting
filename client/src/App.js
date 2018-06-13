import React, { Component } from 'react';
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
        	<div className="container">
            <Route exact path="/" component={DataEntry} />
            <Route exact path = "/forecast" component={Forecast} />
      	  </div>
        </div>
      </Router>
    );
  }
}

export default App;
