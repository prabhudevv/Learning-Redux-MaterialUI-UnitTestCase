import types from "../types/userActionTypes";

const initialState = {
	userData: []
}

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.SET_USER_DATA:
			return {
				...state,
				userData: action.payload
			}
		case types.SET_INPUT_VALUE:
			const { name, value } = action.payload;
			return {
				...state,
				userData: {
					...state.userData,
					[name]: value
				}
			}
		case types.RESET_USER_DATA:
			return {
				...state,
				userData: initialState.userData
			}
		default:
			return state;
	}
}

export default userReducer;