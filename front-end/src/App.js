import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import React from 'react';
import Login from './Pages/Login';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" render={ () => <Redirect to="/login" /> } />
      <Route exact path="/login" component={ Login } />
    </BrowserRouter>
  );
}

export default App;
