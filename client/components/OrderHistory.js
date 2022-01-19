import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { fetchOrders } from '../store/orders'


class OrderHistory extends Component {
    constructor() {
      super()
      this.state = {
        loading: true,
        loadedUserOrder: false,
      }
    }

    componentDidMount() {
      this.setState({ loading: false })
      this.props.loadOrders()
    }
  
    render() {
        let orders = [...this.props.orders] || []
        console.log("orders:", orders);
        return (
            <div>
            <h2>ORDERS:</h2>
                <div className='container'>
                    {orders.map((order)=>{
                        return(
                            <div key={order.id}>
                                <h3>Order #{order.id}</h3>
                                {order.products.map((product) => {
                                    return (
                                        <div className='card' key={product.id}>
                                            <div className='card-header'>
                                                <div className ='card-content'>
                                                    <img src={product.imageURL} />
                                                    <h4>{product.name}</h4>
                                                    <h4>${(product.price/100).toFixed(2)}</h4>
                                                    <Link to={`/products/${product.id}`}>
                                                        <button type='button'>View Item</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })} 
                </div>
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
    }
  }
  
  export default connect(mapState, mapDispatch)(OrderHistory)
  