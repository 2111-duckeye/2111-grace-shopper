import axios from 'axios'

export const GET_ORDER = 'GET_ORDER'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const CHECKOUT_ORDER = 'CHECKOUT_ORDER'
export const CLEAR_ORDER = 'CLEAR_ORDER'

const TOKEN = 'token'

//action creation

export const setOrder = (order) => ({
  type: GET_ORDER,
  order
})


export const _deleteProduct = (updatedOrder) => ({
  type: DELETE_PRODUCT,
  updatedOrder
})

export const _addProduct = (order) => ({
  type: ADD_PRODUCT,
  order
})

export const _updateQuantity = (updatedOrder) => ({
  type: UPDATE_QUANTITY,
  updatedOrder
})


export const _checkoutOrder = (checkedOutOrder) => ({
  type: CHECKOUT_ORDER,
  checkedOutOrder
})

export const _clearOrder = () => ({
  type: CLEAR_ORDER,
  order: {}
})

//Thunk creator

export const fetchOrder = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN)

      if (token) {
        const res = await axios.get('/auth/me', {
          headers: {
            authorization: token
          }
        })

        const { data: order } = await axios.get(`/api/orders/user/${res.data.id}/open`, {
          headers: {
            authorization: token
          }
        })
        return dispatch(setOrder(order))
      }

    } catch (e) {
      console.log("COULDN'T FETCH ORDER", e)
    }
  }
}

export const addProduct = (productId, newQuantity = 0) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN)

      if (token) {
        const res = await axios.get('/auth/me', {
          headers: {
            authorization: token
          }
        })

        const { data: order } = await axios.post(`/api/orders/user/${res.data.id}/open/add/${productId}`, {quantity: newQuantity} , {
          headers: {
            authorization: token
          }
        })

        return dispatch(_addProduct(order))
      }

    } catch (err) {
      console.error(err)
    }
  }
}

export const removeOrderProduct = (productId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN)

      if (token) {
        const res = await axios.get('/auth/me', {
          headers: {
            authorization: token
          }
        })

        const { data: updatedOrder } = await axios.delete(`/api/orders/user/${res.data.id}/open/delete/${productId}`, {
          headers: {
            authorization: token
          }
        })

        return dispatch(_deleteProduct(updatedOrder))
      }


    } catch (error) {
      console.error(error)
    }
  }
}

export const checkoutOrder = (openOrder, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN)
      if (token) {
        const { data: checkedOutOrder } = await axios.put(`/api/orders/${openOrder.id}`, openOrder, {
          headers: {
            authorization: token
          }
        })
        dispatch(_checkoutOrder(checkedOutOrder))
        history.push('/confirmation')
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export default function openOrderReducer(state = {}, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    case DELETE_PRODUCT:
      return action.updatedOrder
    case ADD_PRODUCT:
      return action.order
    case CHECKOUT_ORDER:
      return action.checkedOutOrder      
    case CLEAR_ORDER:
      return action.order
    default:
      return state
  }
}
