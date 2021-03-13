import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import Home from './containers/Home';
import Chat from './containers/Chat';

import 'semantic-ui-css/semantic.min.css';
import './App.css'

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default () => {
  const [sender, setSender] = useState('');

  return (
    <Router>
      {/* <MenuBar /> */}
      <Route exact path='/' component={() => <Home setSender={ (value) => setSender(value) } />} />
      <Route exact path='/chat' component={() => <Chat currentUser={ sender } />} />
    </Router>
  )
}