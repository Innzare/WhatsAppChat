import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './App';
import 'Src/styles/global.scss';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <Router>
    <App />
  </Router>
);
