import { Reducer } from 'redux-testkit'
import {
    CHEKLIST_ANSWERS_SAVED,
    DISPLAY_CHECKLIST_ERROR,
    SET_INITIAL_CHECKLIST,
    CLEAR_CHECKLIST_ANSWERS
} from '../../../store/actionTypes'

import { checklistReducer } from '../reducers'

const initialState = {
    shift: null,
    answersSaved: false,
    initialChecklist: null,
}

describe('Checklist reducer tests', () => {

    it('should have initial state', () => {
        expect(checklistReducer(undefined, {})).toEqual(initialState)
    })

    it('should not affect state if action type is not defined', () => {
        Reducer(checklistReducer).expect({ type: 'NOT_EXISTING' }).toReturnState(initialState)
    })

})




