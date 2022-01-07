import types from "../types/alertActionTypes";

export const showAlert = (message, variant) => {
  return {
    type: types.SHOW_ALERT,
    payload: { message, variant },
  };
};

export const hideAlert = (message, variant) => {
  return {
    type: types.HIDE_ALERT,
  };
};
