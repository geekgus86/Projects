import {
    CHECK_IN,
    CHECK_OUT,
    CHECK_OUT_FULL,
    SET_CURRENT_FAILURE,
    SET_CURRENT_REPORT,
    SET_CURRENT_ESCALATION,
    CLEAR_CURRENT_FAILURE,
    SET_CURRENT_PERIOD_DOWNTIME,
    SET_TOOL_SPEED,
    SET_PRODUCTION,
    SET_CURRENT_SHIFT_LOG,
    SET_LAST_SHIFT_LOG,
    SET_INITIAL_CHECKLIST,
    RELOAD_PRODUCTION,
    RELOAD_SHIFT,
    SET_CURRENT_TOOL,
} from '../../store/actionTypes'

const initialState = {
    machine: null,
    error: null,
    inFailureMode: false,
    report: null,
    escalation: null,
    downtime: null,
    toolSpeed: 0,
    production: [],
    lastShiftLog: [],
    currentShiftLog: [],
    currentWorkOrders: [],
    initialChecklist: null,
    reloadProduction: false,
    reloadShift: false,
    currentTool: ''
}

export function homeReducer(state = initialState, action) {
    switch (action.type) {
        case CHECK_IN:
            return {
                ...state,
                machine: action.payload,
                currentPress: action.payload,
                error: null
            }
        case SET_CURRENT_FAILURE:
            return {
                ...state,
                inFailureMode: true,
                report: action.payload.report,
                escalation: action.payload.escalation,
                error: null
            }
        case CLEAR_CURRENT_FAILURE:
            return {
                ...state,
                inFailureMode: false,
                report: null,
                escalation: null,
                error: null
            }
        case SET_CURRENT_REPORT:
            return {
                ...state,
                inFailureMode: true,
                report: action.payload,
                error: null
            }
        case SET_CURRENT_ESCALATION:
            return {
                ...state,
                inFailureMode: true,
                escalation: action.payload,
                error: null
            }
        case CHECK_OUT:
            return { ...state, ...initialState }

        case CHECK_OUT_FULL:
            return { ...state, ...initialState, currentPress: null }

        case SET_CURRENT_PERIOD_DOWNTIME:
            return {
                ...state,
                downtime: action.payload
            }

        case SET_TOOL_SPEED:
            return {
                ...state,
                toolSpeed: action.payload
            }

        case SET_PRODUCTION:
            return {
                ...state,
                production: action.payload,
                reloadProduction: false
            }

        case SET_LAST_SHIFT_LOG:
            return {
                ...state,
                lastShiftLog: action.payload,
                error: null
            }

        case SET_CURRENT_SHIFT_LOG:
            return {
                ...state,
                currentShiftLog: action.payload.data,
                currentWorkOrders: action.payload.workOrders,
                reloadShift: false,
                error: null
            }

        case SET_INITIAL_CHECKLIST:
            return {
                ...state,
                initialChecklist: action.payload,
                error: null
            }

        case RELOAD_PRODUCTION:
            return {
                ...state,
                reloadProduction: true
            }

        case RELOAD_SHIFT:
            return {
                ...state,
                reloadShift: true
            }

        case SET_CURRENT_TOOL:
            return {
                ...state,
                currentTool: action.payload
            }

        default:
            return state
    }
}