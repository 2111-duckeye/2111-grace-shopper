import axios from 'axios'

const GET_ORDER = 'GET_ORDER'
const GET_ORDERS = 'GET_ORDERS'

//action creation
export const setOrders = (orders) => ({
  type: GET_ORDERS,
  orders
})

export const setOrder = (order) => ({
  type: GET_ORDER,
  order
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

// export const fetchOrder = (orderId) => {
//   return async (dispatch) => {
//     try {
//       const { data: order } = await axios.get('/api/users')
//       dispatch(setOrder(order))
//     } catch (e) {
//       console.log("COULDN'T FETCH USERS", e)
//     }
//   }
// }

export default function ordersReducer(state = [], action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;
    default:
      return state
  }
}
