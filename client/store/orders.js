import axios from 'axios'

const GET_ORDERS = 'GET_ORDERS'

//action creation
export const setOrders = (orders) => ({
  type: GET_ORDERS,
  orders
})

//Thunk creator
export const fetchOrders = (userId) => {
  return async (dispatch) => {
    try {
      const { data: orders } = await axios.get(`/api/orders/user/${userId}`)
      dispatch(setOrders(orders))
    } catch (e) {
      console.log("COULDN'T FETCH ORDERS", e)
    }
  }
}

export default function ordersReducer(state = [], action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;
    default:
      return state
  }
}
