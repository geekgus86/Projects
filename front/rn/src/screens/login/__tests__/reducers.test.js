import { Reducer } from 'redux-testkit'
import {
    SET_PUSH_TOKEN,
    SET_SESSION_DATA,
    SET_APP_DOMAIN,
    CLEAR_SESSION_DATA
} from '../../../store/actionTypes'

import { loginReducer } from '../reducers'

import * as userSessionData from './userSession.json'
import * as userProfileData from './userProfile.json'

const initialState = {
    domain: 'production',
    secure: true,
    info: null,
    profile: {},
    pushToken: '',
    error: null
}

describe('Login reducer tests', () => {

    it('should have initial state', () => {
        expect(loginReducer(undefined, {})).toEqual(initialState)
    })

    it('should not affect state if action type is not defined', () => {
        Reducer(loginReducer).expect({ type: 'NOT_EXISTING' }).toReturnState(initialState)
    })

    it('should store user session', () => {
        const payload = {
            UserLogin: userSessionData,
            Profile: userProfileData
        }
        const action = { type: SET_SESSION_DATA, payload: payload }

        Reducer(loginReducer).expect(action).toReturnState({
            ...initialState,
            info: userSessionData,
            profile: userProfileData
        })
    })

    it('should store push token', () => {
        const payload = '3KTtsAheZm8QIFjQemUxActoieAhL39N'
        const action = { type: SET_PUSH_TOKEN, payload: payload }
        Reducer(loginReducer).expect(action).toReturnState({
            ...initialState,
            pushToken: payload
        })
    })

    it('should store app domain and ssl configuration', () => {
        const payload = { domain: 'metalsa', secure: true }
        const action = { type: SET_APP_DOMAIN, payload: payload }
        Reducer(loginReducer).expect(action).toReturnState({
            ...initialState,
            domain: payload.domain,
            secure: payload.secure
        })
    })

    it('should clear user related information', () => {
        const action = { type: CLEAR_SESSION_DATA }
        Reducer(loginReducer).expect(action).toReturnState({
            ...initialState,
            info: null,
            profile: {},
            pushToken: '',
            error: null
        })
    })

})




