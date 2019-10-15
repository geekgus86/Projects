import { Reducer } from 'redux-testkit'
import {
    SET_ISSUE_TYPES,
    DISPLAY_ERROR,
    SELECT_ISSUE_TYPE,
    DESELECT_ISSUE_TYPE,
    SHOW_SUCCESSFUL_MESSAGE,
    SET_ISSUES,
    FAILURE_IDENTIFIED,
} from '../../../store/actionTypes'

import { issuesReducer } from '../reducers'

const initialState = {
    issueTypes: [],
    error: null,
    message: '',
    issues: [],
    failureIdentified: false
}

describe('Report reducer tests', () => {

    it('should have initial state', () => {
        expect(issuesReducer(undefined, {})).toEqual(initialState)
    })

    it('should not affect state if action type is not defined', () => {
        Reducer(issuesReducer).expect({ type: 'NOT_EXISTING' }).toReturnState(initialState)
    })

})




