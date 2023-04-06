import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import SellerOrders from './pages/SellerOrders';
import SellerOrdersDetails from './pages/SellerOrderDetails';
import Admin from './pages/Admin';
import OrdersDetails from './pages/OrdersDetails';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={ () => <Redirect to="/login" /> } />
        <Route exact path="/login" component={ Login } />

        <Route exact path="/register" component={ Register } />

        <Route exact path="/customer/products" component={ Products } />

        <Route exact path="/customer/checkout" component={ Checkout } />

        <Route exact path="/customer/orders/:id" component={ OrdersDetails } />
        <Route exact path="/customer/orders" component={ Orders } />

        <Route exact path="/seller/orders" component={ SellerOrders } />
        <Route exact path="/seller/orders/:id" component={ SellerOrdersDetails } />

        <Route exact path="/admin/manage" component={ Admin } />

      </Switch>
    </BrowserRouter>
  );
}

export default App;
