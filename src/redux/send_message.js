import { GET_USERS } from "./actionTypes";

export const sendMessage = content => {
   ;
  return {
    type: GET_USERS,
    payload: {
      content
    }
  };
}
