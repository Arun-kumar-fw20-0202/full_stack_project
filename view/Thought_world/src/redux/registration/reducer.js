
import {   
        ADD_USER_ERROR, 
        ADD_USER_REQUEST, 
        ADD_USER_SUCCESS,
        GET_PROFILE,
        GET_USERS_ERROR,
        GET_USERS_REQUEST,
        GET_USERS_SUCCESS, 
    } from "../actionType"


const initialState = {
    users: [],
    profile: {},
    isLoading: false,
    isError: false,
}

export const reducer = (state= initialState, {type, payload}) =>{

    switch(type){
        case ADD_USER_REQUEST : return {...state, isLoading: state.isLoading= true}
        case ADD_USER_SUCCESS : return {...state, isLoading: state.isLoading= false, userData: state.userData = payload}
        case ADD_USER_ERROR : return {...state, isLoading: state.isLoading = false, isError: state.isError = true}

        
        case GET_USERS_REQUEST : return {...state, isLoading: state.isLoading= true}
        case GET_USERS_SUCCESS : return {...state, isLoading: state.isLoading= false, users: state.users = payload}
        case GET_USERS_ERROR : return {...state, isLoading: state.isLoading = false, isError: state.isError = true}

        case GET_PROFILE : return {...state, profile: state.profile= payload}

        default: return state
    }
}