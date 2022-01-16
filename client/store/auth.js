import axios from 'axios'
import history from '../history'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH'

/**
 * ACTION CREATORS
 */
//const setAuth = (auth, openOrder, orders) => ({ type: SET_AUTH, auth, openOrder, orders })

const setAuth = (auth) => ({ type: SET_AUTH, auth})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token
      }
    })

    // const { data: order } = await axios.get(`/api/orders/user/${res.data.id}/open`)
    // const { data: orders } = await axios.get(`/api/orders/user/${res.data.id}`)

    // return dispatch(setAuth(res.data, order, orders))
    return dispatch(setAuth(res.data))
  }
}

export const authenticate = (username, password, email, method) => async dispatch => {
  try {
    const res = await axios.post(`/auth/${method}`, { username, password, email })
    window.localStorage.setItem(TOKEN, res.data.token)
    dispatch(me())
  } catch (authError) {
    return dispatch(setAuth({ error: authError }))
  }
}

export const logout = () => {
  window.localStorage.removeItem(TOKEN)
  history.push('/login')
  return {
    type: SET_AUTH,
    auth: {},
    // openOrder: {
    //   completed: false,
    //   total: 0
    // }
  }
}

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      // return {
      //   user: action.auth,
      //   openOrder: action.openOrder,
      //   orders: action.orders
      // }
      return action.auth
    default:
      return state
  }
}
