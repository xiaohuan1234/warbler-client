import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_MESSAGES, REMOVE_MESSAGE } from "../actionTypes";

export const loadMessages = messages => ({
  type: LOAD_MESSAGES,
  messages
});

export const remove = id => ({
  type: REMOVE_MESSAGE,
  id
});

export const removeMessage = (user_id, message_id) => {
  return dispatch => {
    return apiCall("delete", `/api/users/${user_id}/deliveries/${message_id}`)
      .then(() => dispatch(remove(message_id)))
      .catch(err => {
        addError(err.message);
      });
  };
};

export const fetchMessages = () => {
  return (dispatch, getState) => {
    let { currentUser } = getState();
    const id = currentUser.user.id;
    console.log("currentUser.user", currentUser.user);
    return apiCall("GET", `/api/users/${id}/deliveries`)
      .then(res => {
        console.log("fetchMessages got res:", res);
        dispatch(loadMessages(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
};

export const postNewMessage = (address, start, lunch) => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user.id;
  return apiCall("post", `/api/users/${id}/deliveries`, { address, start, lunch })
    .then(res => {})
    .catch(err => addError(err.message));
};
