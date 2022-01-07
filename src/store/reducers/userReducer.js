import types from "../types/userActionTypes";

const initialState = {
  userData: [],
  newUserData: {
    title: "",
    author: "",
    isActive: true
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case types.SET_INPUT_VALUE:
      const { name, value } = action.payload;
      return {
        ...state,
        newUserData: {
          ...state.newUserData,
          [name]: value,
        },
      };
    case types.RESET_USER_DATA:
      return {
        ...state,
        newUserData: initialState.newUserData,
      };
    case types.SET_USER_DETAIL:
      return {
        ...state,
        newUserData: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
