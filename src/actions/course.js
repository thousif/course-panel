import axios from "axios";
import Cookies from 'universal-cookie';
import * as constants from '../constants';

const cookies = new Cookies();

export const OPEN_COURSE = "OPEN_COURSE";
export const OPEN_COURSE_FULFILLED = "OPEN_COURSE_FULFILLED";
export const OPEN_COURSE_REJECTED = "OPEN_COURSE_REJECTED";

export const ADD_CHAPTER = "ADD_CHAPTER";
export const ADD_CHAPTER_FULFILLED = "ADD_CHAPTER_FULFILLED";
export const ADD_CHAPTER_REJECTED = "ADD_CHAPTER_REJECTED";

export const EDIT_CHAPTER = "EDIT_CHAPTER";
export const EDIT_CHAPTER_FULFILLED = "EDIT_CHAPTER_FULFILLED";
export const EDIT_CHAPTER_REJECTED = "EDIT_CHAPTER_REJECTED";

export const DELETE_CHAPTER = "DELETE_CHAPTER";
export const DELETE_CHAPTER_FULFILLED = "DELETE_CHAPTER_FULFILLED";
export const DELETE_CHAPTER_REJECTED = "DELETE_CHAPTER_REJECTED";

function removeCookies(){
  cookies.remove("course_at");
  cookies.remove("course_aid");
}

export function fetchCourse(id) {
  return function(dispatch) {
    dispatch({type : OPEN_COURSE});
    let config = {
      url : constants.API_ENDPOINT+'/api/course/'+id,
      headers : {
        'x-access-token' : cookies.get("course_aid")
      }
    }
    axios.get(config).then((response) => {
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
    dispatch({type : EDIT_CHAPTER});
    axios.post(constants.API_ENDPOINT+'/api/crs_chapters/edit',chapter).then((response) => {
      dispatch({type : EDIT_CHAPTER_FULFILLED, payload : response });
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
      dispatch({type : EDIT_CHAPTER_REJECTED, payload : err });
    })
  }
}

export function addChapter(chapter) {
  console.log(chapter);
  return function(dispatch) {
    dispatch({type : ADD_CHAPTER });
    axios.post(constants.API_ENDPOINT+'/api/crs_chapters/add',chapter).then((response) => {
      console.log(response);
      dispatch({type : ADD_CHAPTER_FULFILLED, payload : response })
    })
    .catch((err) => {
      console.log(err);
      dispatch({type : ADD_CHAPTER_REJECTED , payload : err})
    })
  }
}

export function deleteChapter(chapter) {
  console.log(chapter);
  return function(dispatch) {
    dispatch({type : DELETE_CHAPTER });
    axios.post(constants.API_ENDPOINT+'/api/crs_chapters/delete',chapter).then((response) => {
      console.log(response);
      dispatch({type : DELETE_CHAPTER_FULFILLED, payload : response});
    })
    .catch((err) => {
      dispatch({type : DELETE_CHAPTER_REJECTED, payload : err });
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
