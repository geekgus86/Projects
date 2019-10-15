import {
	SET_PROCESS_OBJECTIVES,
	SET_PROCESS_OBJECTIVES_REAL_VALUE,
	SET_PROCESS_PARAMETER_ERROR
} from "../../store/actionTypes";

const initialState = {
	error: null,
	objectives: [],
}

export function processParameterReducer(state = initialState, action) {
	switch (action.type) {
		case SET_PROCESS_OBJECTIVES:
			return { ...state, objectives: action.payload, error: null }
		case SET_PROCESS_PARAMETER_ERROR: 
			return { ...state, error: action.payload }
		case SET_PROCESS_OBJECTIVES_REAL_VALUE:
			return { ...state, ...initialState, error: null }
		default:
			return state;
	}
}