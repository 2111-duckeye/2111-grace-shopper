import axios from 'axios';
const GOT_PRODUCTS = 'GOT_PRODUCTS';
const CREATE_PRODUCT = 'CREATE_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const TOKEN = 'token'

//action creation
export const setProducts = (products) => ({
  type: GOT_PRODUCTS,
  products
})
export const _createProduct = (product) => ({
  type: CREATE_PRODUCT,
  product,
});

export const _updateProduct = (product) => ({
  type: UPDATE_PRODUCT,
  product
})

export const _removeProduct = (product) => ({
  type: REMOVE_PRODUCT,
  product,
});

//thunk creator
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const { data: products } = await axios.get('/api/products');
      dispatch(setProducts(products));
    } catch (e) {
      console.log("COULDN'T FETCH PRODUCTS", e);
    }
  };
};

export const createProduct = (product, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);

      if (token) {
        const { data: created } = await axios.post('/api/products', product, {
          headers: {
            authorization: token
          }
        });
        dispatch(_createProduct(created));
        history.push('/');
      }

    } catch (e) {
      console.error("COULDN'T CREATE PRODUCT", e);
    }
  };
};

export const updateProduct = (product, history) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    try {
      if (token) {
        const { data } = await axios.put(`/api/products/${product.id}`.product, {
          headers: {
            authorization: token
          }
        });
        dispatch(_updateProduct(data));
        history.push('/')
      }
    } catch (e) {
      console.error("COULDN'T UPDATE PRODUCT", e)
    }
  }
}

export const deleteProduct = (productId, history) => {
    return async (dispatch) => {
      try {
        const { data: deleted } = await axios.delete(`/api/products/${productId}`);
        dispatch(_removeProduct(deleted));
      } catch (e) {
        console.error("COULDN'T DELETE PRODUCT", e);
      }
    };
  };

  //reducer

  export default function productsReducer(state = [], action) {
    switch (action.type) {
      case GOT_PRODUCTS:
        return action.products;
      case CREATE_PRODUCT:
        return [...state, action.product];
      case REMOVE_PRODUCT:
        return state.filter((product) => product.id !== action.product.id);
      default:
        return state;
    }
  }
