import axios from "axios";
import Cookies from 'universal-cookie';
import * as constants from '../constants';

const cookies = new Cookies();

export const FETCH_COURSES = "FETCH_COURSES";
export const FETCH_COURSES_FULFILLED = "FETCH_COURSES_FULFILLED";
export const FETCH_COURSES_REJECTED = "FETCH_COURSES_REJECTED";

axios.defaults.headers.common['x-access-token'] = cookies.get("course_at");

function removeCookies(){
  cookies.remove("course_at");
  cookies.remove("course_aid");
}

export function fetchCourses() {
  return function(dispatch) {
    dispatch({type : FETCH_COURSES});
    axios.get(constants.API_ENDPOINT+'/api/course/list',{
        headers : {
          'x-access-token' : cookies.get("course_at")
        }
      }).then((response) => {
        console.log(response);
        dispatch({type: FETCH_COURSES_FULFILLED, payload: response.data})
      })
      .catch((err) => {
        console.log(err.response);
        if(err.response && err.response.status == 498){
          removeCookies();
          dispatch({type : "LOGOUT"})
          return
        }
        dispatch({type: FETCH_COURSES_REJECTED, payload: err})
      })
  }
}

export function logout(){
  removeCookies();
  return function(dispatch){
    dispatch({type : "LOGOUT"})
  }
}
