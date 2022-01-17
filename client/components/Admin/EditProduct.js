import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../../store/product';
import { updateProduct } from '../../store/products';
import { Link } from 'react-router-dom';

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imageURL: '',
      description: '',
      price: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const productId = this.props.match.params.productId;
    this.props.fetchProduct(productId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product.id !== this.props.product.id) {
      this.setState({
        name: this.props.product.taskName || '',
        imageURL: this.props.product.assignee || '',
        description: this.props.product.description || '',
        price: this.props.product.price || 0
      });
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.updateProduct({...this.props.product, ...this.state});
  }

  render() {
    const { name, imageURL, description, price } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <div>
        <h2>Edit Product</h2>
      <form id="product-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Product Name:</label>
        <input name="name" onChange={handleChange} value={name} />

        <label htmlFor="imageURL">ImageUrl:</label>
        <input name="imageURL" onChange={handleChange} value={imageURL} />

        <label htmlFor="description">Description:</label>
        <input name="description" onChange={handleChange} value={description} />

        <label htmlFor="price">Price:</label>
        <input name="price" onChange={handleChange} value={price} />

        <button type="submit">Submit</button>
        <Link to="/">Cancel</Link>
      </form>
      </div>
    );
  }
}

const mapState = (state) => ({
  product: state.product
})

const mapDispatch = (dispatch, {history}) => ({
    updateProduct: (product) => dispatch(updateProduct(product, history)),
    fetchProduct: (id) => dispatch(fetchProduct(id))
});

export default connect(mapState, mapDispatch)(EditProduct);