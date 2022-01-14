import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchOrders } from '../store/orders'
import { fetchOrder } from '../store/openOrder';
import { logout } from '../store';

class OrderPage extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      loadedUserOrder: false
    }
  }

  componentDidMount() {
    this.setState({loading: false})
  }

  componentDidUpdate() {
    if(!this.state.loadedUserOrder && this.props.user.id){
      this.props.loadOpenOrder(this.props.user.id)
      this.props.loadOrders(this.props.user.id)
      this.setState({loadedUserOrder: true})
    }
  }

  render() {
    let orders = [...this.props.orders] || []
    let openOrder = this.props.openOrder || {}

    return (
      <div>
        {
          openOrder.total ? <h1>{this.props.user.username}'s Total: {openOrder.total}</h1> : <h1>HELLO ORDER NOT LOADED CHECK</h1>
        }
        <a href='#' onClick={this.props.handleClick}>Logout</a>
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
    loadOpenOrder: (userId) => dispatch(fetchOrder(userId)),
    handleClick: () => dispatch(logout())
  }
}

export default connect(mapState, mapDispatch)(OrderPage)
