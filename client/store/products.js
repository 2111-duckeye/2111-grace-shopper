import axios from 'axios';

const SET_PRODUCTS = 'SET_PRODUCTS';

const setProducts = (products) => ({
    type: SET_PRODUCTS,
    products
})

//thunks
export const fetchProducts = () => {
    return async (dispatch) => {
        const { data: products } = await axios.get('/api/products');
        dispatch(setProducts(products));
    }
}

//reducer
export default (state = [], action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return action.products
        default:
            return state
    }
}