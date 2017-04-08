import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//import jquery and bootstrap js
global.jQuery = require('jquery');
require('bootstrap');

//import bootstrap css
import 'bootstrap/dist/css/bootstrap.css';

import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
