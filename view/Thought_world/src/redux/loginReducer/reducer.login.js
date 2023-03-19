
import {   
    LOGIN_USER_ERROR, 
    LOGIN_USER_REQUEST, 
    LOGIN_USER_SUCCESS, 
    LOGOUT_USER_ERROR, 
    LOGOUT_USER_REQUEST, 
    LOGOUT_USER_SUCCESS 
} from "../actionType"


const initialState = {
activeUser: JSON.parse(localStorage.getItem('userData')) || {},
isAuth: JSON.parse(localStorage.getItem('isAuth')) || false,
isLoading: false,
isError: false,
}

export const Loginreducer = (state= initialState, {type, payload}) =>{

switch(type){
    case LOGIN_USER_REQUEST: return {...state, isLoading: state.isLoading = true}
    case LOGIN_USER_SUCCESS : return {...state, isLoading: state.isLoading = false, isAuth: state.isAuth = true, activeUser: state.activeUser = payload}
    case LOGIN_USER_ERROR : return {...state, isLoading: state.isLoading= false, isError: state.isError= true}

    case LOGOUT_USER_REQUEST: return {...state,  isLoading: state.isLoading = true}
    case LOGOUT_USER_SUCCESS: return {...state, isLoading: state.isLoading = false, isAuth: state.isAuth= false, activeUser: state.activeUser = {}}
    case LOGOUT_USER_ERROR : return {...state, isLoading: state.isLoading = false, isError: state.isError= true}

    default: return state
}
}