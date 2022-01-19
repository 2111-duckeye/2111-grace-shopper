import axios from 'axios'

export const GET_ORDER = 'GET_ORDER'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const CHECKOUT_ORDER = 'CHECKOUT_ORDER'
export const CLEAR_ORDER = 'CLEAR_ORDER'
export const GET_GUEST_ORDER = 'GET_GUEST_ORDER'

const TOKEN = 'token'
const guestCart = 'guestCart'

//action creation

export const setOrder = (order) => ({
  type: GET_ORDER,
  order
})

export const setGuestOrder = (order) => ({
  type: GET_GUEST_ORDER,
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
      const cart = JSON.parse(window.localStorage.getItem(guestCart))

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

        if(cart){
          window.localStorage.removeItem(guestCart)
        }

        return dispatch(setOrder(order))

      } else if (!cart){
          window.localStorage.setItem(guestCart, JSON.stringify({ items: [] }))
      } else {
        return dispatch(setGuestOrder(cart))
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

      const { data: productToAdd} = await axios.get(`/api/products/${productId}`)

      let { id, imageURL, price, name } = productToAdd

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
      } else {
        const guest = JSON.parse(window.localStorage.getItem(guestCart))

        const itemIndex = guest.items.findIndex(item => item.id === productToAdd.id)

        if(itemIndex > -1 && newQuantity === 0) {
          guest.items[itemIndex].quantity = guest.items[itemIndex].quantity + 1
        } else if (itemIndex > -1 && newQuantity > 0) {
          guest.items[itemIndex].quantity = newQuantity
        }
        else {
          guest.items.push({id, name, imageURL, price, quantity: 1})
        }

        window.localStorage.setItem(guestCart, JSON.stringify(guest))
        return dispatch(setGuestOrder(guest))
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
      } else {
        const guest = JSON.parse(window.localStorage.getItem(guestCart))

        guest.items = guest.items.filter(item => item.id !== productId)

        window.localStorage.setItem(guestCart, JSON.stringify(guest))

        return dispatch(_deleteProduct(guest))
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
      } else {
        const guest = JSON.parse(window.localStorage.getItem(guestCart))

        window.localStorage.setItem(guestCart, JSON.stringify({ items: [] }))

        dispatch(_checkoutOrder(guest))
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
    case GET_GUEST_ORDER:
      return action.order
    default:
      return state
  }
}
