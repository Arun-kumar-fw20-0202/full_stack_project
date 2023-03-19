import {
  FOLLOW_ERROR,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  GET_FOLLOWER,
  UN_FOLLOW,
} from "../actionType";

const initialState = {
  follower: [],
  isLoading: false,
  isError: false,
};

export const FollowerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FOLLOW_REQUEST:
      return { ...state, isLoading: (state.isLoading = true) };
    case FOLLOW_SUCCESS:
      return {
        ...state,
        isLoading: (state.isLoading = false),
        follower: (state.follower = [...state.follower, payload]),
      };
    case FOLLOW_ERROR:
      return {
        ...state,
        isLoading: (state.isLoading = false),
        isError: (state.isError = true),
      };

    case GET_FOLLOWER:
      return { ...state, follower: (state.follower = payload) };

    case UN_FOLLOW: {
      const filterLikes = state.follower.filter((ele) => ele._id != payload);
      return { ...state, follower: filterLikes };
    }

    default:
      return state;
  }
};
