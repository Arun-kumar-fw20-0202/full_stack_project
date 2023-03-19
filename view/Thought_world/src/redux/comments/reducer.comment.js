import { ADD_COMMENT, GET_COMMENT } from "../actionType";

const initialState = {
    comments : [],
    isLoading: false,
    isError: false
}

export const commentReducer = (state = initialState, {type,payload}) => {

    switch(type){
        case ADD_COMMENT: return {...state, comments: state.comments = [...state.comments, payload]}
        case GET_COMMENT: return {...state, comments: state.comments = payload}

        default: return state;
    }
}