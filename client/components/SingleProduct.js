import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../store';

class SingleProduct extends Component {
  componentDidMount() {
    const productId = this.props.match.params.productId;
    this.props.fetchProduct(productId);
  }
  render() {
    const { product } = this.props || {};

    return (
      <main className="container">
        <div className="left-column">
          <img src={product.imageURL} style={{ width: '500px', height: 'auto' }} />
        </div>
        <div className="right-column">
          <h1 className="singleItemName">{product.name}</h1>
          <p>{product.description}</p>
          <div className="product-price">
            <span>${product.price}</span>
            <br></br>
            <br></br>
            <button type="submit">Add to cart</button>
          </div>
        </div>
      </main>
    );
  }
}

const mapState = (state) => ({
  product: state.product,
});

const mapDispatch = (dispatch) => ({
  fetchProduct: (id) => dispatch(fetchProduct(id)),
});

export default connect(mapState, mapDispatch)(SingleProduct);
