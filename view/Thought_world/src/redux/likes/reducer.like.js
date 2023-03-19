import { GET_LIKES, GIVE_LIKE, REMOVE_LIKES } from "../actionType";

const initialState = {
  likes: [],
};

export const LikeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GIVE_LIKE:
      return { ...state, likes: (state.likes = [...state.likes, payload]) };
    case GET_LIKES:
      return { ...state, likes: (state.likes = payload) };
    case REMOVE_LIKES: {
      const filterLikes = state.likes.filter((ele) => ele._id != payload);
      return { ...state, likes: filterLikes };
    }

    default:
      return state;
  }
};
