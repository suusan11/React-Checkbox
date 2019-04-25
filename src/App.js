import React, { Component } from 'react';
import './App.css';

import Checkbox from './Checkbox';
import CoveredAreaCheckbox from "./CoveredAreaCheckbox";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<Checkbox />*/}
        <CoveredAreaCheckbox />
      </div>
    );
  }
}

export default App;
