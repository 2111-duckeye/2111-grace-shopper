import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { fetchOrder } from '../store/openOrder';
import Button from 'react-bootstrap/Button';

class Navbar extends React.Component {
  componentDidMount() {
    this.props.loadOpenOrder()
  }

  componentDidUpdate() {
    if(!this.props.openOrder.id && this.props.isLoggedIn) {
      this.props.loadOpenOrder()
    }
  }



  render () {
    const openOrder = this.props.openOrder || {}
    const isLoggedIn = this.props.isLoggedIn || false
    const isAdmin = this.props.isAdmin || false

    return (
      <div className="header-container">
        <div className="header-container-left">
          <Link to="/">
            <h2 className="duckeye-title">Duckeye Emporium</h2>
          </Link>
        </div>
        <nav className="header-container-right">
          <Link to="/order">
            <Button variant="light" type="button">
              <img
                className="cart-button-img"
                src="https://image.flaticon.com/icons/png/512/34/34627.png"
              />
              {openOrder.products === undefined
                ? ''
                : `(${openOrder.products
                    .map((items) => parseInt(items.Cart_Item.quantity, 10))
                    .reduce((prev, curr) => prev + curr, 0)})`}
            </Button>
          </Link>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/" className="home-button">
                <Button>Home</Button>
              </Link>
              <a href="#" onClick={this.props.handleClick} className="logout-button">
                <Button>Logout</Button>
              </a>
              <Link to="/user/order-history" className="signup-button">
                <Button>Order History</Button>
              </Link>
            </div>
          ) : (
            <div className="header-buttons">
              {/* The navbar will show these links before you log in */}
              <Link to="/" className="home-button">
                <Button>Home</Button>
              </Link>
              <Link to="/login" className="login-button">
                <Button>Login</Button>
              </Link>
              <Link to="/signup" className="signup-button">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
          {isAdmin ? (
            <Link to="/admin/home">
              <Button type="button">Admin</Button>
            </Link>
          ) : (
            ''
          )}
        </nav>
      </div>
    )
  }

}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin,
    openOrder: state.openOrder,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
    loadOpenOrder: () => dispatch(fetchOrder()),
  };
};

export default connect(mapState, mapDispatch)(Navbar);
