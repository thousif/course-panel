import axios from "axios";
import Cookies from 'universal-cookie';
import * as constants from '../constants';

const cookies = new Cookies();

export const OPEN_CHAPTER = "OPEN_CHAPTER";
export const OPEN_CHAPTER_FULFILLED = "OPEN_CHAPTER_FULFILLED";
export const OPEN_CHAPTER_REJECTED = "OPEN_CHAPTER_REJECTED";

export const FETCH_QUIZZES = "FETCH_QUIZZES";
export const FETCH_QUIZZES_FULFILLED = "FETCH_QUIZZES_FULFILLED";
export const FETCH_QUIZZES_REJECTED = "FETCH_QUIZZES_REJECTED";

export const FETCH_LECTURES = "FETCH_LECTURES";
export const FETCH_LECTURES_FULFILLED = "FETCH_LECTURES_FULFILLED";
export const FETCH_LECTURES_REJECTED = "FETCH_LECTURES_REJECTED";

export const UPDATE_CURRICULUM = "UPDATE_CURRICULUM";
export const UPDATE_CURRICULUM_FULFILLED = "UPDATE_CURRICULUM_FULFILLED";
export const UPDATE_CURRICULUM_REJECTED = "UPDATE_CURRICULUM_REJECTED";

export const ADD_TOPIC = "ADD_TOPIC";
export const ADD_TOPIC_FULFILLED = "ADD_TOPIC_FULFILLED";
export const ADD_TOPIC_REJECTED = "ADD_TOPIC_REJECTED";

function removeCookies(){
  cookies.remove("course_at");
  cookies.remove("course_aid");
}

export function fetchChapter(cid,ch_id) {
  return function(dispatch) {
    dispatch({type : OPEN_CHAPTER});
    axios.post(constants.API_ENDPOINT+'/api/crs_chapters/open',{
      cid,ch_id
    }).then((response) => {
      console.log(response);
      dispatch({type: OPEN_CHAPTER_FULFILLED, payload: response.data})
    })
    .catch((err) => {
      console.log(err);
      dispatch({type: OPEN_CHAPTER_REJECTED, payload: err})
    })
  }
}

export function fetchQuizzes(cid) {
  return function(dispatch) {
    dispatch({type : FETCH_QUIZZES});
    axios.get(constants.API_ENDPOINT+'/api/crs_quiz/list').then((response) => {
      console.log(response);
      dispatch({type: FETCH_QUIZZES_FULFILLED, payload: response.data})
    })
    .catch((err) => {
      console.log(err);
      dispatch({type: FETCH_QUIZZES_REJECTED, payload: err})
    })
  }
}

export function fetchLectures(cid) {
  return function(dispatch) {
    dispatch({type : FETCH_LECTURES});
    axios.get(constants.API_ENDPOINT+'/api/crs_lecture/list').then((response) => {
      console.log(response);
      dispatch({type: FETCH_LECTURES_FULFILLED, payload: response.data})
    })
    .catch((err) => {
      console.log(err);
      dispatch({type: FETCH_LECTURES_REJECTED, payload: err})
    })
  }
}

export function addTopic(topic) {
  return function(dispatch) {
    dispatch({type : ADD_TOPIC})
    axios.post(constants.API_ENDPOINT+'/api/crs_chapters/add_topic',topic)
    .then((response) => {
      console.log(response);
      dispatch({type : ADD_TOPIC_FULFILLED, payload : response });
    })
    .catch((err) => {
      console.log(err);
      dispatch({type : ADD_TOPIC_REJECTED , payload : err });
    })
  }
}

export function updateCurriculum(data) {
  return function(dispatch) {
    dispatch({ type : UPDATE_CURRICULUM })
    axios.post(constants.API_ENDPOINT + '/api/crs_chapters/update_cur',data)
    .then((response) => {
      console.log(response);
      dispatch({type : UPDATE_CURRICULUM_FULFILLED, payload : response });
    })
    .catch((err) => {
      console.log(err);
      dispatch({type : UPDATE_CURRICULUM_REJECTED, payload : err });
    })
  }
}

export function logout(){
  removeCookies();
  return function(dispatch){
    dispatch({type : "LOGOUT"})
  }
}
