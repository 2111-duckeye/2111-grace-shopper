import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { fetchOrders } from '../store/orders'
import { fetchOrder, removeOrderProduct, checkoutOrder} from '../store/openOrder';
import product from '../store/product';
import { addProduct, _clearOrder } from '../store/openOrder';


class OrderPage extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      loadedUserOrder: false,
      updatedOrder: false,
      guestCart: {}
    }

    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(evt) {
    this.props.addProduct(evt.target.id, evt.target.value)
    this.setState({updatedOrder: true})
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
    if(this.state.updatedOrder && !this.props.openOrder.id) {
      this.props.loadOpenOrder()
      this.setState({updatedOrder: false})
    }
  }

  render() {
    //const guestCart = window.localStorage.getItem('guestCart') || {}
    let orders = [...this.props.orders] || []
    let openOrder = this.props.openOrder || {}
    let guestItems = this.props.openOrder.items || []
    let products = this.props.openOrder.products || []
    let user = this.props.user || {}

    return (

      <div>
      {
        user.id ? (
          <div>
            <h2>Items in Cart:</h2>
            {
              products.length ?
                (<div className='container'>
                  {products.map((product) => {
                    let quantityToPopulate = []

                    for (let i = 1; i <= product.Cart_Item.quantity + 6; i++) {
                      quantityToPopulate.push(i)
                    }

                      return (<div className='card' key={product.id}>
                        <div className='card-header'>
                          <div className ='card-content'>
                            <img src={product.imageURL} />
                            <h4>{product.name}</h4>
                            <h4>${(product.price/100).toFixed(2)}</h4>
                            <Link to={`/products/${product.id}`}>
                              <button type='button'>View Item</button>
                            </Link>
                            {
                                <div>Quantity:
                                  <select name="quantity" id={product.id} onChange={this.handleSelect} value={product.Cart_Item.quantity}>

                                    {
                                      quantityToPopulate.map((number) => {
                                        return (
                                          <option key={number} value={number}>{number}</option>
                                        )
                                      })
                                    }

                                  </select>
                                  <button className='delete' type='delete' onClick={ () =>this.props.deleteProduct(product.id)}>Remove From Cart</button>
                                </div>
                              }

                          </div>
                        </div>
                      </div>
                    )
                  }

                  )}
                </div>) : <h2>Nothing in Cart</h2>
            }
            {

              openOrder.id ? (
                <div>
                  <h1>{this.props.user.username}'s Total: ${(openOrder.total / 100).toFixed(2)}</h1>

                  {products.length ? (<button className='checkout' type='checkout' onClick={() => this.props.checkout(openOrder)}>Checkout</button>): ''}
                </div>
              ) : <h1>Loading</h1>
            }
          </div>
        ) : (
          <div>
            <div>
              {
                !user.id ? (<div>
                  <h2>Items in Cart:</h2>
                  {
                    guestItems.length ?
                    (<div className='container'>
                      {guestItems.map((product) => {
                        let quantityToPopulate = []

                        for (let i = 1; i <= product.quantity + 6; i++) {
                          quantityToPopulate.push(i)
                        }

                          return (<div className='card' key={product.id}>
                            <div className='card-header'>
                              <div className ='card-content'>
                                <img src={product.imageURL} />
                                <h4>{product.name}</h4>
                                <h4>${(product.price/100).toFixed(2)}</h4>
                                <Link to={`/products/${product.id}`}>
                                  <button type='button'>View Item</button>
                                </Link>
                                {
                                    <div>Quantity:
                                      <select name="quantity" id={product.id} onChange={this.handleSelect} value={product.quantity}>

                                        {
                                          quantityToPopulate.map((number) => {
                                            return (
                                              <option key={number} value={number}>{number}</option>
                                            )
                                          })
                                        }

                                      </select>
                                      <button className='delete' type='delete' onClick={ () =>this.props.deleteProduct(product.id)}>Remove From Cart</button>
                                    </div>
                                  }

                              </div>
                            </div>
                          </div>
                        )
                      }

                      )}
                    </div>)
                    : <div>Nothing in Cart</div>
                  }
                </div>) : <div>Loading</div>
              }
            </div>
            {

              !user.id ? (
                <div>
                  <h1>Guest's Total: ${(guestItems.reduce( (acc, product) => acc + (product.price * product.quantity) , 0) / 100).toFixed(2)}</h1>

                  {
                    guestItems.length? (
                      <button className='checkout' type='checkout' onClick={() => this.props.checkout(openOrder)}>Checkout</button>
                    ) : ''
                  }


                </div>
              ) : <h1>Loading</h1>
            }
              </div>
            )
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

const mapDispatch = (dispatch, {history}) => {
  return {
    loadOrders: (userId) => dispatch(fetchOrders(userId)),
    loadOpenOrder: () => dispatch(fetchOrder()),
    deleteProduct: (productId) => dispatch(removeOrderProduct(productId)),
    checkout: (openOrder) => dispatch(checkoutOrder(openOrder, history)),
    addProduct: (productId, newQuantity) => dispatch(addProduct(productId, newQuantity)),
    clearOrder: () => dispatch(_clearOrder())
  }
}

export default connect(mapState, mapDispatch)(OrderPage)
