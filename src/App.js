import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Search, Result, Song} from './components/';


import './App.css';

class App extends Component {

  render () {
    return (
      <Router>
        <Grid container alignContent="center" justify="center" direction="column" style={{ height: '100%', width: "100%" }}>
          <Grid item xs={12} md={8} lg={6} alignItems="center" justify="center" style={{ height: '100%', width: "100%" }} >
            <Route exact path="/" component={Search} />
            <Route path="/result" component={Result} />
            <Route path='/song/:index' component={Song} />
          </Grid>
        </Grid>
      </Router>
    );
  }
}

export default App;
