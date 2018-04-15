import { OPEN_COURSE,
         OPEN_COURSE_FULFILLED,
         OPEN_COURSE_REJECTED,
         ADD_CHAPTER,
         ADD_CHAPTER_FULFILLED,
         ADD_CHAPTER_REJECTED,
         EDIT_CHAPTER,
         EDIT_CHAPTER_FULFILLED,
         EDIT_CHAPTER_REJECTED,
         DELETE_CHAPTER,
         DELETE_CHAPTER_FULFILLED,
         DELETE_CHAPTER_REJECTED,
       } from '../actions/course'
export default function reducer(state={
    course : {},
    status : {
      update : false
    },
  }, action) {
    switch (action.type) {
      case OPEN_COURSE : {
        return {
          ...state,
        }
      }
      case OPEN_COURSE_FULFILLED : {
        console.log(action.payload)
        return {
          ...state,
          course : action.payload.data
        }
      }
      case OPEN_COURSE_REJECTED : {
        console.log(action.payload);
        return state
      }
      case "LOGOUT":{
        console.log("logging out");
        return {
          ...state
        }
      }
      case ADD_CHAPTER_FULFILLED : {
        return {
          ...state,
          status : {
            update : true
          }
        }
      }
      case EDIT_CHAPTER_FULFILLED : {
        return {
          ...state,
          status : {
            update : true
          }
        } 
      }
      case DELETE_CHAPTER_FULFILLED : {
        return {
          ...state,
          status : {
            update : true
          }
        }
      }
    }

    return state
}

