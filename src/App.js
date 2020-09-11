import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes/router';
import AlertInfo from './components/Alert/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import './global.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <AlertInfo />
    </>
  );
}

export default App;
