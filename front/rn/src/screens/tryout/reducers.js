import {
    DISPLAY_ERROR_OUTS,
    SET_ISSUES_OUTS,
    SELECT_SINGLE_ISSUE_OUTS,
    SET_ASSISTANCE_USER_OUTS,
} from '../../store/actionTypes'


const initialState = {
    issueTypes: [],
    error: null,
    message: '',
    outs: [],
    failureIdentified: false
}


export function outsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ISSUES_OUTS:
            return {
                ...state,
                // make the issue selectable by adding the selected prop
                outs: action.payload.map((i) => {
                    i.selected = false
                    return i
                }),
                error: null,
            }
            
        case DISPLAY_ERROR_OUTS:
            return {
                ...state,
                issueTypes: [],
                error: action.payload,
            }

        case SELECT_SINGLE_ISSUE_OUTS:
        const issueList = state.outs.map((i) => {
            if (i.ID === action.payload.ID) {
                i.selected = true
            } else {
                i.selected = false
            }                
            return i
        })
        return {
            ...state,
            outs: issueList,
            error: null,
        }
        case SET_ASSISTANCE_USER_OUTS:
        return {
            ...state,
            user: action.payload
        }  
        default:
            return state
    }
}