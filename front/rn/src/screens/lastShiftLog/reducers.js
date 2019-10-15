import {
    SET_LAST_SHIFT_LOG,
    SET_LAST_SHIFT_DATE,
    SET_LAST_SHIFT_RANGE
} from '../../store/actionTypes'

const initialState = {
    error: null,
    toDate: '',
    range: '',
    lastShiftLog: [],
}

export function lastShiftLogReducer(state = initialState, action) {
    switch (action.type) {

        case SET_LAST_SHIFT_LOG:
            return {
                ...state,
                lastShiftLog: action.payload,
                error: null
            }

        case SET_LAST_SHIFT_DATE:
            return {
                ...state,
                toDate: action.payload,
                error: null
            }

        case SET_LAST_SHIFT_RANGE:
            return {
                ...state,
                range: action.payload,
                error: null
            }

        default:
            return state
    }
}