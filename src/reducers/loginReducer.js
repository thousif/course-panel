export default function reducer(state={
    user: {
      logged : false,
      logging : true,
      verifying : false,
      token : null,
      logout : false
    },
    register : {
      logged : false,
      logging : true,
      verifying : false,
      token : null,
      logout : false
    },
    fetching: false,
    fetched: false,
    error: null,
  }, action) {
    switch (action.type) {
      case "LOGIN_USER": {
        return {...state,
            user : { ...state.user, logging : true, verifying : false }, 
            fetching: true
          }
      }
      case "LOGIN_USER_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "LOGIN_USER_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          user: { ...state.user, logging : true, verifying : true,logged : true, token : action.payload.token}, 
        }
      }
      case "REGISTER_USER": {
        return {...state,
            register : { ...state.user, logging : true, verifying : false }, 
            fetching: true
          }
      }
      case "REGISTER_USER_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "REGISTER_USER_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          register: { ...state.user, logging : true, verifying : true,logged : true, token : action.payload.token}, 
        }
      }
      case "LOGOUT":{
        console.log("logging out");
        return {
          ...state,
          user : {...state.user,logging:true,verifying:false,logged:false,token:null,logout : true}
        }
      }
    }

    return state
}
