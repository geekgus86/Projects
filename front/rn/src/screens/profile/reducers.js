import {
    SET_KPIS,
    SET_KPIS_DATE
} from '../../store/actionTypes'

const initialState = {
    error: null,
    date: '',
    kpis: [],
}

export function kpisProfileReducer(state = initialState, action) {
    switch (action.type) {

        case SET_KPIS:
            return {
                ...state,
                kpis: action.payload,
                error: null
            }
        
        case SET_KPIS_DATE:
            return {
                ...state,
                date: action.payload,
                error: null
            }

        default:
            return state
    }
}