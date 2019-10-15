import { Reducer } from 'redux-testkit'
import {
    CHECK_IN,
    CHECK_OUT,
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
} from '../../../store/actionTypes'

import { homeReducer } from '../reducers'

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
    initialChecklist: null,
    reloadProduction: false,
    reloadShift: false,
}

describe('Home reducer tests', () => {

    it('should have initial state', () => {
        expect(homeReducer(undefined, {})).toEqual(initialState)
    })

    it('should not affect state if action type is not defined', () => {
        Reducer(homeReducer).expect({ type: 'NOT_EXISTING' }).toReturnState(initialState)
    })

})




