import React, { Component } from "react";
import { connect } from "react-redux";
import { createProduct } from "../store";
import { Link } from "react-router-dom";

class CreateProduct extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      imageURL: "",
      description: "",
      price: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.createCampus({ ...this.state });
    this.setState({
      name: "",
      imageURL: "",
      description: "",
      price: 0
    });
  }

  render() {
    const { name, imageURL, description, price } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <form id="product-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Product Name:</label>
        <input name="name" onChange={handleChange} value={name} />

        <label htmlFor="imageURL">ImageUrl:</label>
        <input name="imageUrl" onChange={handleChange} value={imageURL} />

        <label htmlFor="description">Description:</label>
        <input name="description" onChange={handleChange} value={description} />

        <label htmlFor="price">Price:</label>
        <input name="price" onChange={handleChange} value={price} />

        <button type="submit">Submit</button>
        <Link to="/">Cancel</Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => ({
  createProduct: (product) => dispatch(createProduct(product, history)),
});

export default connect(null, mapDispatchToProps)(CreateProduct);
