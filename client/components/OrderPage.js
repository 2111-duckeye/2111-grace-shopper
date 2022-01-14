import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchOrders } from '../store/orders'
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
      this.props.loadOrders(this.props.user.id)
      this.setState({loadedUserOrder: true})
    }
  }

  render() {
    const orders = this.props.orders || []

    return (
      <div>
        {
          orders.length ? <h1>{this.props.user.username}'s Total: {orders[0].total}</h1> : <h1>HELLO ORDER NOT LOADED CHECK</h1>
        }
        <a href='#' onClick={this.props.handleClick}>Logout</a>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    orders: state.orders,
    user: state.auth
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadOrders: (userId) => dispatch(fetchOrders(userId)),
    handleClick: () => dispatch(logout())
  }
}

export default connect(mapState, mapDispatch)(OrderPage)
