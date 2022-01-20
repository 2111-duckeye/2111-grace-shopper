import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, updateProduct } from '../../store';
import { Link, useHistory } from 'react-router-dom';

const EditProduct = (props) => {
  //[] syntax used to destructor , set__ is similar to this.setState used as a setter
  //useState passed in with initial value, then set variables. this is used to hold state
  const [name, setName] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  //hook to access redux dispatch to use on thunks
  const dispatch = useDispatch();

  const history = useHistory();

  const id = props.match.params.productId;

  //similar to componentDidMount: first param is a callback function and second is a dependency arr (aka signifies that the callback should be ran once)
  useEffect(() => {
    dispatch(fetchProduct(id));
  }, []);

  //grabs the product info off state - similar to using mapStateToProps
  const product = useSelector((state) => {
    return state.product;
  });

  //if product state changes, then run callback function
  useEffect(() => {
    if (product.name && product.imageURL && product.description && product.price) {
      setName(product.name);
      setImageURL(product.imageURL);
      setDescription(product.description);
      setPrice(product.price);
    }
  }, [product]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(updateProduct({ ...product, name, imageURL, description, price }, history));
  };

  return (
    <div className="right-column">
      <form id="product-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Product Name:</label>
        <input name="name" onChange={(e) => setName(e.target.value)} value={name} />

        <label htmlFor="imageURL">ImageUrl:</label>
        <input name="imageURL" onChange={(e) => setImageURL(e.target.value)} value={imageURL} />

        <label htmlFor="description">Description:</label>
        <input
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />

        <label htmlFor="price">Price:</label>
        <input name="price" onChange={(e) => setPrice(e.target.value)} value={price} />

        <button type="submit">Submit</button>
        <Link to="/">Cancel</Link>
      </form>
    </div>
  );
};

export default EditProduct;
