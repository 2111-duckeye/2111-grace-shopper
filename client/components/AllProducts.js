import React, { Component } from 'react';
import { AddShoppingCart } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/products';
import { fetchOrder,addProduct } from '../store/openOrder';

class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchProducts();
    this.props.loadOpenOrder()
  }

<<<<<<< Updated upstream
  render() {
=======
	render() {
>>>>>>> Stashed changes
    const products = this.props.products || [];
    return (
      <div className="container">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <div className="card-header">
              <div className="card-content">
                <img src={product.imageURL} />
                <h4>{product.name}</h4>
                <h4>${(product.price / 100).toFixed(2)}</h4>
                <Link to={`/products/${product.id}`}>
                  <button type="button">View Item</button>
                </Link>
                <button
                  type={product.id}
                  onClick={() => {
                    this.props.addProduct(product.id);
<<<<<<< Updated upstream
                    window.location.reload();
=======
                    //window.location.reload();
>>>>>>> Stashed changes
                  }}
                >
                  Add to Cart
                </button>
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
  openOrder: state.openOrder
});

const mapDispatch = (dispatch) => ({
<<<<<<< Updated upstream
  fetchProducts: () => dispatch(fetchProducts()),
  addProduct: (productId) => dispatch(addProduct(productId)),
=======
	fetchProducts: () => dispatch(fetchProducts()),
	addProduct: (productId) => dispatch(addProduct(productId)),
  loadOpenOrder: () => dispatch(fetchOrder()),
>>>>>>> Stashed changes
});

export default connect(mapState, mapDispatch)(AllProducts);
