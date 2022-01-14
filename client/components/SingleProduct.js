import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProduct } from "../store";


class SingleProduct extends Component {
  componentDidMount() {
    const productId = this.props.match.params.productId;
    this.props.fetchProduct(productId)
  }
  render() {
    const product = this.props.product;

    return (
      <main class="container">
        <div class="left-column">
        <img src={product.imageURL} style={{ width: "500px", height: "500px" }} />
        </div>
        <div class="right-column">
        <h1 className="singleItemName">{product.name}</h1>
        <p>{product.description}</p>
        <div class="product-price">
          <span>{product.price}</span>
          <button type="submit">Add to cart</button></div>
        </div>
      </main>
    );
  }
}

const mapState = (state) => ({
  product: state.product
})

const mapDispatch = (dispatch) => ({
  fetchProduct: (id) => dispatch(fetchProduct(id))
})

export default connect(mapState, mapDispatch)(SingleProduct);