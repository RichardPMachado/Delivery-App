import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Seller from './pages/Seller';
import Admin from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={ () => <Redirect to="/login" /> } />
        <Route exact path="/login" component={ Login } />

        <Route exact path="/register" component={ Register } />

        <Route exact path="/customer/products" component={ Products } />

        <Route exact path="/customer/checkout" component={ Checkout } />

        <Route exact path="/customer/orders/:id" component={ Orders } />
        <Route exact path="/customer/orders" component={ Orders } />

        <Route exact path="/seller/orders" component={ Seller } />
        <Route exact path="/seller/orders/:id" component={ Seller } />

        <Route exact path="/admin/manage" component={ Admin } />

      </Switch>
    </BrowserRouter>
  );
}

export default App;
