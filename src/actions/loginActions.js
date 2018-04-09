import axios from "axios";
import Cookies from 'universal-cookie';
import * as constants from '../constants';

const cookies = new Cookies();

function removeCookies(){
  cookies.remove("course_at");
  cookies.remove("course_aid");
}

export function loginUser(data) {
  return function(dispatch) {
    dispatch({type : "LOGIN_USER"});
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

export function registerUser(data) {
  return function(dispatch) {
    dispatch({type : "REGISTER_USER"});
    axios.post(constants.API_ENDPOINT+'/api/auth/register',{
        email    : data.email,   
        password : data.password,
        name     : data.name
      }).then((response) => {
        console.log(response);
        cookies.set("course_at",response.data.token);
        cookies.set("course_aid",response.data.id);
        dispatch({type: "REGISTER_USER_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        console.log(err);
        dispatch({type: "REGISTER_USER_REJECTED", payload: err})
      })
  }
}

export function logout(){
  removeCookies();
  return function(dispatch){
    dispatch({type : "LOGOUT"})
  }
}

export function verifyUser(token,data) {
  var verifyConfig = {
    method: 'POST',
    url: constants.API_ENDPOINT+'/oauth/ops_verify',
    headers: {
        'x-access-req-token' : token
    },
    data: {
      code : data.otp
    }
  };
  return function(dispatch) {
    dispatch({type : "VERIFY_OTP"});
    axios(verifyConfig).then((response) => {
        console.log(response);
        cookies.set("ops_at",response.data.data.ops_access_token);
        cookies.set("ops_aid",response.data.data.aid);
        dispatch({type: "VERIFY_OTP_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        console.log(err);
        dispatch({type: "VERIFY_OTP_REJECTED", payload: err})
      })
  }
}