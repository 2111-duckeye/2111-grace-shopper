import axios from 'axios'

const GET_ORDER = 'GET_ORDER'

//action creation

export const setOrder = (order) => ({
  type: GET_ORDER,
  order
})

//Thunk creator

export const fetchOrder = (userId) => {
  return async (dispatch) => {
    try {
      const { data: order } = await axios.get(`/api/orders/user/${userId}/open`)
      dispatch(setOrder(order))
    } catch (e) {
      console.log("COULDN'T FETCH ORDER", e)
    }
  }
}

export default function openOrderReducer(state = {}, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    default:
      return state
  }
}
