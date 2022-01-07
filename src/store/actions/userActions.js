import types from "../types/userActionTypes";

export const setUserData = (payload) => {
  return { type: types.SET_USER_DATA, payload };
};

export const setInputValue = (name, value) => {
  return { type: types.SET_INPUT_VALUE, payload: { name, value } };
};

export const resetUserData = (payload) => {
  return { type: types.RESET_USER_DATA, payload };
};

export const setUserDetail = (payload) => {
  return { type: types.SET_USER_DETAIL, payload };
};