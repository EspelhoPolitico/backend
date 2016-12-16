import '../styles/App.css';

import Navigation from './Navigation';
import React from 'react';

function App (props) {
  return (
    <div className="App">
      <Navigation/>
      {props.children}
    </div>
  );
}

export default App;
