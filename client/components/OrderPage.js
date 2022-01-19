import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchOrders } from '../store/orders'
import { fetchOrder, removeOrderProduct, checkoutOrder } from '../store/openOrder';
import { logout } from '../store';
import product from '../store/product';
import { Switch, Redirect } from 'react-router-dom';


class OrderPage extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      loadedUserOrder: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.setState({ loading: false })
    this.props.loadOpenOrder()
    this.props.loadOrders()
  }

  componentDidUpdate() {
    if (!this.state.loadedUserOrder && this.props.user.id) {
      this.setState({ loadedUserOrder: true })
    }
  }

  /*handleClick(evt) {
    evt.preventDefault();
    this.props.checkout(openOrder)
     <Switch>< Redirect to='/confirmation' /></Switch>
  }
  */


  render() {
    let orders = [...this.props.orders] || []
    let openOrder = this.props.openOrder || {}
    let products = this.props.openOrder.products || []

    return (
      <div>
        <h2>Items in Cart:</h2>
        {
          products.length ? (
            <div>
              <ol>
                {products.map((product) => {
                  return (
                    <div key={product.id}>
                      <li>{product.name}, price: ${(product.price / 100).toFixed(2)}, quantity: {product.Cart_Item.quantity}</li>
                      <button className='delete' type='delete' onClick={() => this.props.deleteProduct(product.id)}>X</button>
                    </div>
                  )
                })}
              </ol>
            </div>
          ) : (
            <h2>Nothing in Cart</h2>
          )
        }
        {
          openOrder.id ? (
            <div>
              <h1>{this.props.user.username}'s Total: ${(openOrder.total / 100).toFixed(2)}</h1>
              <button className='checkout' type='checkout' onClick={() => this.props.checkout(openOrder)}>Checkout</button>
            </div>
          ) : <h1>HELLO ORDER NOT LOADED CHECK</h1>
        }
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    orders: state.orders,
    openOrder: state.openOrder,
    user: state.auth
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadOrders: (userId) => dispatch(fetchOrders(userId)),
    loadOpenOrder: () => dispatch(fetchOrder()),
    handleClick: () => dispatch(logout()),
    deleteProduct: (productId) => dispatch(removeOrderProduct(productId)),
    checkout: (openOrder) => dispatch(checkoutOrder(openOrder))
  }
}

export default connect(mapState, mapDispatch)(OrderPage)
