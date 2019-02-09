import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import MainNav from './Nav';
import Routes from './Routes';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainNav />
        <Routes />
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
