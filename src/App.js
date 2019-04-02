import React, { Component } from 'react';
import './App.css';

import Checkbox from './Checkbox';
import CoverdAreaCheckbox from "./CoverdAreaCheckbox";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<Checkbox />*/}
        <CoverdAreaCheckbox />
      </div>
    );
  }
}

export default App;
