import React, { Component } from 'react';
import { AddShoppingCart } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/products';

class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    const products = this.props.products || [];
    return (
      <div className="container">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <div className="card-header">
              <div className="card-content">
                <img src={product.imageURL} />
                <h4>{product.name}</h4>
                <h4>${product.price}</h4>
                <Link to={`/products/${product.id}`}>
                  <button type="button">View Item</button>
                </Link>
                <button type="button">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapState = (state) => ({
  products: state.products,
});

const mapDispatch = (dispatch) => ({
  fetchProducts: () => dispatch(fetchProducts()),
});

export default connect(mapState, mapDispatch)(AllProducts);
