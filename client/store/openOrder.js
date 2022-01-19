import { NextWeek } from '@material-ui/icons'
import axios from 'axios'
import product from './product'

export const GET_ORDER = 'GET_ORDER'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const CHECKOUT_ORDER = 'CHECKOUT_ORDER'


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

export const _addProduct = (updatedOrder) => ({
  type: ADD_PRODUCT,
  updatedOrder
})

export const _checkoutOrder = (checkedOutOrder) => ({
  type: CHECKOUT_ORDER,
  checkedOutOrder
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

export const addProduct = (productId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN)

      if (token) {
        const res = await axios.get('/auth/me', {
          headers: {
            authorization: token
          }
        })

        const { data: updatedOrder } = await axios.post(`/api/orders/user/${res.data.id}/open/add/${productId}`, {
          headers: {
            authorization: token
          }
        })

        return dispatch(_addProduct(updatedOrder))
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

export const checkoutOrder = (openOrder) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN)
      if (token) {
        // const res = await axios.get('/auth/me', {
        //   headers: {
        //     authorization: token
        //   }
        // })
        const { data: checkedOutOrder } = await axios.put(`/api/orders/${openOrder.id}`, openOrder, {
          headers: {
            authorization: token
          }
        })
        return dispatch(_checkoutOrder(checkedOutOrder))
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
      return action.updatedOrder
    case CHECKOUT_ORDER:
      return action.checkedOutOrder
    default:
      return state
  }
}
