import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import store from './store';
import Header from './components/layout/Header';
import Home from './components/Home';
import Footer from './components/layout/Footer';
import ProductDetails from './components/products/ProductDetails';
import Login from './components/user/Login';
import Register from './components/user/Register';
import { loadUser } from './actions/userActions';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/routes/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess';
import ListOrders from './components/orders/ListOrders';
import OrderDetails from './components/orders/OrderDetails';
import Dashboard from './components/admin/Dashboard';
import ProductsLists from './components/admin/ProductsLists';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrderLists from './components/admin/OrderLists';
import ProcessOrder from './components/admin/ProcessOrder';
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';
import ProductReviews from './components/admin/ProductReviews';
import './css/App.css';

function App() {

  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');

      setStripeApiKey(data.stripeApiKey)
    }
    getStripApiKey();
  }, [])

  return (
    <Router>
      <Header/>
      <div className="container container-fluid">
        <Route exact path='/' component={Home}/>
        <Route path='/search/:keyword' component={Home}/>
        <Route path='/products/:id' component={ProductDetails}/>

        <Route exact path='/cart' component={Cart}/>
        <ProtectedRoute exact path='/shipping' component={Shipping}/>
        <ProtectedRoute exact path='/orders/confirm' component={ConfirmOrder}/>
        {stripeApiKey && <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path='/payment' component={Payment}/>
        </Elements>}
        <ProtectedRoute exact path='/success' component={OrderSuccess}/>
        <ProtectedRoute exact path='/orders/me' component={ListOrders}/>
        <ProtectedRoute exact path='/order/:id' component={OrderDetails}/>

        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route exact path='/password/forgot' component={ForgotPassword}/>
        <Route exact path='/password/reset/:token' component={ResetPassword}/>

        <ProtectedRoute exact path='/me' component={Profile}/>
        <ProtectedRoute exact path='/me/update' component={UpdateProfile}/>
        <ProtectedRoute exact path='/password/update' component={UpdatePassword}/>
      </div>
        <ProtectedRoute exact path='/dashboard' isAdmin={true} component={Dashboard}/>
        <ProtectedRoute exact path='/admin/products' isAdmin={true} component={ProductsLists}/>
        <ProtectedRoute exact path='/admin/product' isAdmin={true} component={NewProduct}/>
        <ProtectedRoute exact path='/admin/products/:id' isAdmin={true} component={UpdateProduct}/>

        <ProtectedRoute exact path='/admin/orders' isAdmin={true} component={OrderLists}/>
        <ProtectedRoute exact path='/admin/order/:id' isAdmin={true} component={ProcessOrder}/>

        <ProtectedRoute exact path='/admin/users' isAdmin={true} component={UsersList}/>
        <ProtectedRoute exact path='/admin/user/:id' isAdmin={true} component={UpdateUser}/>
        <ProtectedRoute exact path='/admin/reviews' isAdmin={true} component={ProductReviews}/>
      <Footer/>
    </Router>
  );
}

export default App;
