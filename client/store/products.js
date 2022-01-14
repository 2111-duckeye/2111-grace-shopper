import axios from 'axios';
const GOT_PRODUCTS = 'GOT_PRODUCTS';
const CREATE_PRODUCT = 'CREATE_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

//action creation
export const setProducts = (products) => ({
	type: GOT_PRODUCTS,
	products,
});
export const _createProduct = (product) => ({
	type: CREATE_PRODUCT,
	product,
});
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
			const { data: created } = await axios.post('/api/products', product);
			dispatch(_createProduct(created));
		} catch (e) {
			console.error("COULDN'T CREATE PRODUCT", e);
		}
	};
};

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
