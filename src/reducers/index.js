import { combineReducers } from "redux"
import login from "./loginReducer"
import home from './home'
import course from './course'

export default combineReducers({
  login,
  home,
  course
})
