import axios from "axios";
import Cookies from 'universal-cookie';
import * as constants from '../constants';

const cookies = new Cookies();

function removeCookies(){
  cookies.remove("course_at");
  cookies.remove("course_aid");
}

export function fetchCourses() {
  return function(dispatch) {
    dispatch({type : "FETCH_COURSES"});
    axios.post(constants.API_ENDPOINT+'/api/auth/login',{
        email    : data.email,   
        password : data.password
      }).then((response) => {
        console.log(response);
        cookies.set("course_at",response.data.token);
        cookies.set("course_aid",response.data.id);
        dispatch({type: "LOGIN_USER_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        console.log(err);
        dispatch({type: "LOGIN_USER_REJECTED", payload: err})
      })
  }
}

export function logout(){
  removeCookies();
  return function(dispatch){
    dispatch({type : "LOGOUT"})
  }
}
