import axios from 'axios'

const GET_ORDERS = 'GET_ORDERS'
const TOKEN = 'token'

//action creation
export const setOrders = (orders) => ({
  type: GET_ORDERS,
  orders
})

//Thunk creator
export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN)

      if (token) {
        const res = await axios.get('/auth/me', {
          headers: {
            authorization: token
          }
        })

        const { data: orders } = await axios.get(`/api/orders/user/${res.data.id}`, {
          headers: {
            authorization: token
          }
        })
        return dispatch(setOrders(orders))
      }
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
