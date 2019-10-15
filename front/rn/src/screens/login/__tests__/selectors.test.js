import { Selector } from 'redux-testkit'
import { getDevicePushToken, getAuthError } from '../reducers'

const emptyState = {
    session: {
        domain: 'production',
        secure: true,
        info: null,
        profile: {},
        pushToken: '',
        error: null
    }
}

const fullState = {
    session: {
        domain: 'production',
        secure: true,
        info: null,
        profile: {},
        pushToken: '3KTtsAheZm8QIFjQemUxActoieAhL39N',
        error: 'Campos email o password no válidos'
    }
}

describe('Login selectors tests', () => {

    it('should return an empty string if the device push token is not defined', () => {
        Selector(getDevicePushToken).expect(emptyState).toReturn('')
    })

    it('should return null if there is no error', () => {
        Selector(getAuthError).expect(emptyState).toReturn(null)
    })

    it('should return the device push token', () => {
        Selector(getDevicePushToken).expect(fullState).toReturn('3KTtsAheZm8QIFjQemUxActoieAhL39N')
    })

    it('should return the error', () => {
        Selector(getAuthError).expect(fullState).toReturn('Campos email o password no válidos')
    })

})