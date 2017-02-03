import '../styles/App.css';

import { Container } from 'semantic-ui-react';
import Navigation from './Navigation';
import React from 'react';

function App(props) {
  return (
    <Container className="App">
      <Navigation />
      {props.children}
    </Container>
  );
}

export default App;
