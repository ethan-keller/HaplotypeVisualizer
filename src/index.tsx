import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import AppRouter from './AppRouter';

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById('root'),
);
