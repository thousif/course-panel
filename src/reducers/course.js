import { OPEN_COURSE,
         OPEN_COURSE_FULFILLED,
         OPEN_COURSE_REJECTED
       } from '../actions/course'
export default function reducer(state={
    course : {}
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
    }

    return state
}

