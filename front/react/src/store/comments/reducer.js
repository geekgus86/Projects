import { SET_ERROR } from "./types";

const initialState = {
    error: null
}

export function commentsReducer(state = initialState, action) {

    switch (action.type) {
        case SET_ERROR:
            return { ...state, error: action.payload }
        default:
            return state;
    }

}