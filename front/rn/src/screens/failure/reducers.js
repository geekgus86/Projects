import {
    SET_ALL_COMMENTS,
    CLEAR_COMMENTS,
    SET_FAILURE_LOG,
    SET_ASSISTANCE_USER,
    CLEAR_ASSISTANCE_USER,
    SET_REPORT,
    SET_DOWNTIME_HISTORIC,
    SET_WORKORDERS_MAXIMO,
    WORK_ORDER_MAXIMO_CREATED,
    WORK_ORDER_MAXIMO_UPDATED,
    WORK_ORDER_MAXIMO_CREATED_SFMS,
    WORK_ORDER_MAXIMO_UPDATED_SFMS,
    WORK_ORDER_MAXIMO_EXISTS_SFMS,
    CURRENT_DOWNTIME_TOOL
} from '../../store/actionTypes'

const initialState = {
    selectedReport: [],
    comments: [],
    asistenciaLog: [],
    historic: [],
    report: null,
    user: null,
}

export function forumCommentsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ALL_COMMENTS:
            return {
                ...state,
                selectedReport: action.payload.selected,
                comments: action.payload.data
            }
        case CLEAR_COMMENTS:
            return {
                ...state,
                selectedReport: [],
                comments: [],
            }
        case SET_FAILURE_LOG:
            return {
                ...state,
                asistenciaLog: action.payload
            }
        case SET_ASSISTANCE_USER:
            return {
                ...state,
                user: action.payload
            }
        case SET_REPORT:
            return {
                ...state,
                report: action.payload
            }
        case SET_DOWNTIME_HISTORIC:
            return {
                ...state,
                historic: action.payload
            }
        case CLEAR_ASSISTANCE_USER:
            return {
                ...state,
                user: null
            }
        case SET_WORKORDERS_MAXIMO:
            return {
                ...state,
                items: action.payload,
                shift: action.shift
            }
        case WORK_ORDER_MAXIMO_CREATED:
            return {
                ...state,
                respWOMResponse: action.payload,
                respWOMCorrect: action.correct
            }
        case WORK_ORDER_MAXIMO_UPDATED:
            return {
                ...state,
                respWOMResponseUpd: action.payload,
                respWOMCorrectUpd: action.correct
            }
        case WORK_ORDER_MAXIMO_CREATED_SFMS:
            return {
                ...state,
                respWOMResponseSFMS: action.payload
            }
        case WORK_ORDER_MAXIMO_UPDATED_SFMS:
            return {
                ...state,
                respWOMResponseSFMSUpd: action.payload
            }
        case WORK_ORDER_MAXIMO_EXISTS_SFMS:
            return {
                ...state,
                recordWOMSFMS: action.payload,
                existsWOMSFMS: action.exists
            }
        case CURRENT_DOWNTIME_TOOL:
            return {
                ...state,
                toolCurrentDT: action.payload
            }
        default:
            return state
    }
}
