import {
    SET_ISSUE_TYPES,
    DISPLAY_ERROR,
    SELECT_ISSUE_TYPE,
    DESELECT_ISSUE_TYPE,
    SHOW_SUCCESSFUL_MESSAGE,
    SET_ISSUES,
    FAILURE_IDENTIFIED,
    SET_ABNORNALITY_COMMENT,
    SELECT_SINGLE_ISSUE,
} from '../../store/actionTypes'

const initialState = {
    issueTypes: [],
    error: null,
    message: '',
    issues: [],
    failureIdentified: false
}

export function issuesReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ISSUE_TYPES:
            const selectableIssueTypes = action.payload.map((issueType) => {
                issueType.selected = false;
                return issueType;
            });
            return {
                ...state,
                issueTypes: selectableIssueTypes,
                error: null,
            }
        case SET_ISSUES:
            return {
                ...state,
                // make the issue selectable by adding the selected prop
                issues: action.payload.map((i) => {
                    i.selected = false
                    return i
                }),
                error: null,
            }
        case DISPLAY_ERROR:
            return {
                ...state,
                issueTypes: [],
                error: action.payload,
            }
        case SELECT_ISSUE_TYPE:
            const selectedIssueTypes = state.issueTypes.map((issueType) => {
                if (issueType.id === action.payload.id) {
                    issueType.selected = true
                }
                return issueType
            })
            return {
                ...state,
                issueTypes: selectedIssueTypes,
                error: null,
            }
        case DESELECT_ISSUE_TYPE:
            const deselectedIssueTypes = state.issueTypes.map((issueType) => {
                if (issueType.id === action.payload.id) {
                    issueType.selected = false
                    issueType.comment = ''
                }
                return issueType
            })
            return {
                ...state,
                issueTypes: deselectedIssueTypes,
                error: null,
            }
        case SET_ABNORNALITY_COMMENT:
            const IssueTypes = state.issueTypes.map((issueType) => {
                if (issueType.id === action.payload.id) {
                    issueType.comment = action.payload.comment
                }
                return issueType
            })
            return {
                ...state,
                issueTypes: IssueTypes,
                error: null,
            }
        case FAILURE_IDENTIFIED:
            return {
                ...state,
                failureIdentified: action.payload,
                error: null,
            }
        case SELECT_SINGLE_ISSUE:
            const issueList = state.issues.map((i) => {
                if (i.id === action.payload.id) {
                    i.selected = true
                } else {
                    i.selected = false
                }                
                return i
            })
            return {
                ...state,
                issues: issueList,
                error: null,
            }

        default:
            return state
    }
}