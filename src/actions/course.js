import axios from "axios";
import Cookies from 'universal-cookie';
import * as constants from '../constants';

const cookies = new Cookies();

export const OPEN_COURSE = "OPEN_COURSE";
export const OPEN_COURSE_FULFILLED = "OPEN_COURSE_FULFILLED";
export const OPEN_COURSE_REJECTED = "OPEN_COURSE_REJECTED";

function removeCookies(){
  cookies.remove("course_at");
  cookies.remove("course_aid");
}

export function fetchCourse(id) {
  return function(dispatch) {
    dispatch({type : OPEN_COURSE});
    axios.get(constants.API_ENDPOINT+'/api/course/'+id).then((response) => {
      console.log(response);
      dispatch({type: OPEN_COURSE_FULFILLED, payload: response.data})
    })
    .catch((err) => {
      console.log(err);
      dispatch({type: OPEN_COURSE_REJECTED, payload: err})
    })
  }
}

export function editChapter(chapter) {
  console.log(chapter);
  return function(dispatch) {
    axios.post(constants.API_ENDPOINT+'/api/crs_chapters/edit',chapter).then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

export function addChapter(chapter) {
  console.log(chapter);
  return function(dispatch) {
    axios.post(constants.API_ENDPOINT+'/api/crs_chapters/add',chapter).then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

export function deleteChapter(chapter) {
  console.log(chapter);
  return function(dispatch) {
    axios.post(constants.API_ENDPOINT+'/api/crs_chapters/delete',chapter).then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

export function logout(){
  removeCookies();
  return function(dispatch){
    dispatch({type : "LOGOUT"})
  }
}
