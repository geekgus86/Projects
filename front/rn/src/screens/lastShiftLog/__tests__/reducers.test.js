import { Reducer } from 'redux-testkit'
import {
    SET_LAST_SHIFT_LOG,
    SET_LAST_SHIFT_DATE,
    SET_LAST_SHIFT_RANGE
} from '../../../store/actionTypes'

import { lastShiftLogReducer } from '../reducers'
import * as lastShiftLogData from './lastShiftlog.json'

const initialState = {
    error: null,
    toDate: '',
    range: '',
    lastShiftLog: [],
}


describe('LastShiftLog reducer tests', () => {

    it('should have initial state', () => {
        expect(lastShiftLogReducer(undefined, {})).toEqual(initialState)
    })

    it('should not affect state if action type is not defined', () => {
        Reducer(lastShiftLogReducer).expect({ type: 'NOT_EXISTING' }).toReturnState(initialState)
    })

    it('should store lastShiftlog', () => {
        const payload = lastShiftLogData.data
        const action = { type: SET_LAST_SHIFT_LOG, payload: payload }

        Reducer(lastShiftLogReducer).expect(action).toReturnState({
            ...initialState,
            lastShiftLog: payload,
            error: null
        })
    })

    it('should store last shift date', () => {
        const payload = lastShiftLogData.toDate
        const action = { type: SET_LAST_SHIFT_DATE, payload: payload }
        Reducer(lastShiftLogReducer).expect(action).toReturnState({
            ...initialState,
            toDate: payload,
            error: null
        })
    })

    it('should store last shift range', () => {
        const payload = lastShiftLogData.range
        const action = { type: SET_LAST_SHIFT_RANGE, payload: payload }
        Reducer(lastShiftLogReducer).expect(action).toReturnState({
            ...initialState,
            range: payload,
            error: null
        })
    })

})




