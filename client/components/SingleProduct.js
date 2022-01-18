import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProduct, deleteProduct } from '../store';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';


class SingleProduct extends Component {

  componentDidMount() {
    const productId = this.props.match.params.productId;
    this.props.fetchProduct(productId)
  }

  render() {

    const {product} = this.props || {};
    const {isAdmin} = this.props;

   return (
      <main className="container">
        <div className="left-column">
        <img src={product.imageURL} style={{ width: "500px", height: "500px" }} />
  
        </div>
        <div className="right-column">
        <h1 className="singleItemName">{product.name}</h1>
        <p>{product.description}</p>
        <div className="product-price">
          <span>{`$${product.price}`}</span>
          <button type="submit" style={{margin: "3%"}}>Add to cart</button></div>   
          {isAdmin ? 
          ( <div>
            <Link to="/addproduct" className="admin-button">
              <Button>Create Product</Button>
            </Link>
            <Link to={`/products/${product.id}/edit`} className="admin-button">
              <Button>Edit Product</Button>
            </Link>
            <a href="#" onClick={(evt) => {
              evt.preventDefault()
              this.props.deleteProduct(product.id)
            }} className="admin-button">
             <Button>Delete Product</Button></a>
            </div>) 
            : 
          ('')}

        </div>
      </main>
    );
 }
}


const mapState = (state) => ({
  product: state.product,
  isAdmin: state.auth.isAdmin
})


const mapDispatch = (dispatch, { history }) => ({
  fetchProduct: (id) => dispatch(fetchProduct(id)),
  deleteProduct: (id) => dispatch(deleteProduct(id, history))

})

export default connect(mapState, mapDispatch)(SingleProduct);
