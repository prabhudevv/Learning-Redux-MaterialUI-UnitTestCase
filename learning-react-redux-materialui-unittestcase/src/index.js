import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import StoreProvider from './StoreProvider';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider />
  </React.StrictMode>,
  document.getElementById('root')
);