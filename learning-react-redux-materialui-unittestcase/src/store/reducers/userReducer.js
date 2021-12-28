import types from "../types/userActionTypes";

const initialState = {
	userData: {
		users: []
	}
}

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.SET_USER_DATA:
			return {
				...state,
				userData: action.payload
			}
		default:
			return state;
	}
}

export default userReducer;