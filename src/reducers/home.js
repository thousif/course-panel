import { FETCH_COURSES,
         FETCH_COURSES_FULFILLED,
         FETCH_COURSES_REJECTED
       } from '../actions/home'
export default function reducer(state={
    courses : {}
  }, action) {
    switch (action.type) {
      case FETCH_COURSES : {
        return {
          ...state,
        }
      }
      case FETCH_COURSES_FULFILLED : {
        console.log(action.payload)
        return {
          ...state,
          courses : action.payload
        }
      }
      case FETCH_COURSES_REJECTED : {
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

