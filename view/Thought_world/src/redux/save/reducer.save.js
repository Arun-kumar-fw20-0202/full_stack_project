import { GET_SAVE_POST, REMOVE_SAVE_POST, SAVE_POST } from "../actionType";

const initialState = {
  save: [],
};

export const SaveReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SAVE_POST:
      return { ...state, save: (state.save = [...state.save, payload]) };
    case GET_SAVE_POST:
      return { ...state, save: (state.save = payload) };
    case REMOVE_SAVE_POST: {
      const filterLikes = state.save.filter((ele) => ele._id != payload);
      return { ...state, save: filterLikes };
    }
    default:
      return state;
  }
};
