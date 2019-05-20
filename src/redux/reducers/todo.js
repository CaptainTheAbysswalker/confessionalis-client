import { SEND } from "../actionTypes";

const initialState = {
  allIds: [],
  byIds: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEND:
      const { id, content } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            content
          }
        }
      };

    default:
      return state;
  }
}

const getLocalState = state => {
  return state.todos;
};

export const getTodosMessage = state => {
  return getLocalState(state).byIds;
};

export const getTodosIds = state => {
  return getLocalState(state).allIds;
};
