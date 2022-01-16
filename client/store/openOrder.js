import axios from 'axios'

export const GET_ORDER = 'GET_ORDER'
const TOKEN = 'token'

//action creation

export const setOrder = (order) => ({
  type: GET_ORDER,
  order
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

        const { data: order } = await axios.get(`/api/orders/user/${res.data.id}/open`)
        // const { data: orders } = await axios.get(`/api/orders/user/${res.data.id}`)

        // return dispatch(setAuth(res.data, order, orders))
        return dispatch(setOrder(order))
      }

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
