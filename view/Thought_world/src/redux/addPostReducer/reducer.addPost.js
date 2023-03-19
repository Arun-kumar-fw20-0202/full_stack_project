import {
  ADD_POST_ERROR,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  DELETE_POST,
  GET_POST_ERROR,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_SINGLE_POST_SUCCESS,
} from "../actionType";

const initialState = {
  posts: [],
  singlePost: {},
  isLoading: false,
  isError: false,
};

export const AddPostreducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_POST_REQUEST:
      return { ...state, isLoading: (state.isLoading = true) };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        isLoading: (state.isLoading = false),
        posts: (state.posts = payload),
      };
    case ADD_POST_ERROR:
      return {
        ...state,
        isLoading: (state.isLoading = false),
        isError: (state.isError = true),
      };

    case GET_POST_REQUEST:
      return { ...state, isLoading: (state.isLoading = true) };
    case GET_POST_SUCCESS:
      return {
        ...state,
        isLoading: (state.isLoading = false),
        posts: (state.posts = payload),
      };
    case GET_POST_ERROR:
      return {
        ...state,
        isLoading: (state.isLoading = false),
        isError: (state.isError = true),
      };

    case GET_SINGLE_POST_SUCCESS:
      return { ...state, singlePost: (state.singlePost = payload) };

    case DELETE_POST: {
      const filterPost = state.posts.filter((ele) => ele._id != payload);
      return { ...state, posts: filterPost };
    }

    default:
      return state;
  }
};
