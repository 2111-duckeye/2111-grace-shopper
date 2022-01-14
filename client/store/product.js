import axios from 'axios';

const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT';

export const setSingleProduct = (product) => ({
  type: SET_SINGLE_PRODUCT,
  product,
});

export const fetchProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data: product } = await axios.get(`/api/products/${id}`);
      dispatch(setSingleProduct(product));
    } catch (e) {
      console.log("COULDN'T FETCH SINGLE PRODUCT", e);
    }
  };
};

//reducer
export default (state = {}, action) => {
    switch (action.type) {
        case SET_SINGLE_PRODUCT:
            return action.product
        default:
            return state
    }
}