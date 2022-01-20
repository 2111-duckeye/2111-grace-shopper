import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import { me, fetchOrder, fetchOrders } from './store';
import SingleProduct from './components/SingleProduct';
import Users from './components/Users';
import OrderPage from './components/OrderPage';
import CreateProduct from './components/Admin/CreateProduct';
import EditProduct from './components/Admin/EditProduct';
import AdminHome from './components/Admin/AdminHome';
import OrderHistory from './components/OrderHistory';
import { Confirmation } from './components/Confirmation'

/* * COMPONENT */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/order" component={OrderPage} />
            <Route exact path="/user/order-history" component={OrderHistory}/>
            <Route exact path="/confirmation" component={Confirmation} />
            <Route path="/products/:productId" component={SingleProduct} />
            <Redirect from="/login" to="/" />
            <Redirect from="/signup" to="/" />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/products/:productId" component={SingleProduct} />
            <Route exact path="/order" component={OrderPage} />
            <Route exact path="/confirmation" component={Confirmation} />
          </Switch>
        )}
        {isLoggedIn && isAdmin ? (
          <Switch>
            <Route exact path="/admin/home" component={AdminHome} />
            <Route exact path="/addproduct" component={CreateProduct} />
            <Route path="/products/:productId/edit" component={EditProduct} />
          </Switch>
        ) : (
          ''
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    isAdmin: !!state.auth.isAdmin,
    //user: state.auth
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
      dispatch(fetchOrder());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
