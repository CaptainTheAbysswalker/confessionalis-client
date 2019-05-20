import { LOGIN } from "./actionTypes";

let nextTodoId = 0;

export const getError = content => {
  return {
    type: LOGIN,
    payload: {
      id: ++nextTodoId,
      content
    }
  };
};
