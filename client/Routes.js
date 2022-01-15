import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect, BrowserRouter as Router} from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import SingleProduct from "./components/SingleProduct";
import AllProducts from "./components/AllProducts";
import Users from "./components/Users";
import OrderPage from "./components/OrderPage";



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
            <Route exact path='/' component={Home} />
            <Route exact path='/order' component={OrderPage} />
            <Route path='/products/:productId' component={SingleProduct} />
          </Switch>
        ) : (
          <Switch>
           <Route exact path='/' component={Home} />
           <Route path='/login' component={Login} />
           <Route path='signup' component={Signup} />
           <Route path='/products/:productId' component={SingleProduct} />
           <Route exact path='/order' component={OrderPage} />
          </Switch>
        )}
        {isLoggedIn && isAdmin ? (
          <Switch>
            <Route exact path='/admin/users' component={Users} />
          </Switch>
        ) : ''}
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
    isAdmin: state.auth.isAdmin
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
