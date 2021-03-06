import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import auth from './auth'
import users from './users'
import products from './products'
import orders from './orders'
import openOrder from './openOrder'
import product from './product'

const reducer = combineReducers({ auth, users, orders, openOrder, products, product })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
export * from './users'
export * from './products'
export * from './orders'
export * from './openOrder'
export * from './product'