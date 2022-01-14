import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect, BrowserRouter as Router} from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import SingleProduct from "./components/SingleProduct";
import AllProducts from "./components/AllProducts";
import Cart from "./components/Cart";
import Users from "./components/Users";
import OrderPage from "./components/OrderPage";


/* * COMPONENT */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <Switch>
        {/*Routes available to all visitors */}
        <Route path="/order" component={OrderPage} />
        <Route exact path='/' component={AllProducts} />
        <Route exact path='/login' component={Login} />
        <Route path="/products/:productId" component={SingleProduct} />
        {/* <Route path="/cart" exact component={Cart} /> */}
        <Route path="/users" component={Users} />

        {isLoggedIn ? (
          <Switch>
            <Route path="/" component={AllProducts} />
            <Redirect to="/" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
        <Switch>
          <Route path="/order" component={OrderPage} />
        </Switch>
      </Switch>
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
