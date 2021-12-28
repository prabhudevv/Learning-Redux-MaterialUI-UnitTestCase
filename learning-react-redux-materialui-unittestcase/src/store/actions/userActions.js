import types from "../types/userActionTypes";

export const setUserData = (payload) => {
	return { type: types.SET_USER_DATA, payload }
}