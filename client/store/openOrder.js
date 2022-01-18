import axios from 'axios'

export const GET_ORDER = 'GET_ORDER'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
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


    } catch(error) {
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
    default:
      return state
  }
}
