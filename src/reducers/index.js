import { combineReducers } from "redux"
import login from "./loginReducer"
import home from './home'
import course from './course'
import chapter from './chapter'

export default combineReducers({
  login,
  home,
  chapter,
  course
})
