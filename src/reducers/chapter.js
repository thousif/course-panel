import { OPEN_CHAPTER,
         OPEN_CHAPTER_FULFILLED,
         OPEN_CHAPTER_REJECTED,
         FETCH_QUIZZES,
         FETCH_QUIZZES_FULFILLED,
         FETCH_QUIZZES_REJECTED,
         ADD_TOPIC,
         ADD_TOPIC_FULFILLED,
         ADD_TOPIC_REJECTED,
         FETCH_LECTURES,
         FETCH_LECTURES_FULFILLED,
         FETCH_LECTURES_REJECTED,
         UPDATE_CURRICULUM,
         UPDATE_CURRICULUM_FULFILLED,
         UPDATE_CURRICULUM_REJECTED,
       } from '../actions/chapter'
export default function reducer(state={
    chapter : {},
    status : {
      update : false
    },
    quizList : [],
    lectureList : []
  }, action) {
    switch (action.type) {
      case OPEN_CHAPTER : {
        return {
          ...state,
        }
      }
      case OPEN_CHAPTER_FULFILLED : {
        console.log(action.payload)
        return {
          ...state,
          chapter : action.payload,
        }
      }
      case OPEN_CHAPTER_REJECTED : {
        console.log(action.payload);
        return state
      }
      case FETCH_QUIZZES : {
        return state
      }
      case ADD_TOPIC : {
        return state
      }
      case ADD_TOPIC_FULFILLED : {
        return {
          ...state,
          status : {
            update  : true
          }
        }
      }
      case ADD_TOPIC_REJECTED : {
        return state
      }
      case FETCH_QUIZZES_FULFILLED : {
        console.log(action.payload)
        return {
          ...state,
          quizList : action.payload
        }
      }
      case FETCH_QUIZZES_REJECTED : {
        console.log(action.payload);
        return state
      }
      case FETCH_LECTURES : {
        return state
      }
      case FETCH_LECTURES_FULFILLED : {
        console.log(action.payload)
        return {
          ...state,
          lectureList : action.payload
        }
      }
      case FETCH_LECTURES_REJECTED : {
        console.log(action.payload);
        return state
      }
      case UPDATE_CURRICULUM : {
        return state
      }
      case UPDATE_CURRICULUM_FULFILLED : {
        return {
          ...state,
          status : {
            update : true
          }
        }
      }
      case UPDATE_CURRICULUM_REJECTED : {
        return state
      }
      case "LOGOUT":{
        console.log("logging out");
        return {
          ...state
        }
      }
    }
  return state
}

