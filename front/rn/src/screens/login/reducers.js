import {
    SET_PUSH_TOKEN,
    DISPLAY_AUTH_ERROR,
    SET_SESSION_DATA,
    CLEAR_SESSION_DATA,
    SET_APP_DOMAIN,
    SET_ORIENTATION,
    CHECK_FOR_UPDATES,
} from '../../store/actionTypes'

const initialState = {
    domain: 'production',
    secure: false,
    info: null,
    profile: {},
    pushToken: '',
    error: null,
    tablet: false,
}

export function getDevicePushToken(state) {
    return state.session.pushToken
}

export function getAuthError(state) {
    return state.session.error
}

export function loginReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SESSION_DATA:
            return {
                ...state,
                info: action.payload.UserLogin,
                profile: action.payload.Profile,
                error: null
            }
        case SET_PUSH_TOKEN:
            return {
                ...state,
                pushToken: action.payload
            }
        case SET_APP_DOMAIN:
            return {
                ...state,
                domain: action.payload.domain,
                secure: action.payload.secure
            }
        case SET_ORIENTATION:
            return {
                ...state,
                tablet: action.payload
            }
        case CHECK_FOR_UPDATES:
            return { ...state, versionInfo: action.payload }
        case DISPLAY_AUTH_ERROR:
            return { ...state, error: action.payload }

        case CLEAR_SESSION_DATA:
            return {
                ...state,
                domain: 'production',
                info: null,
                profile: {},
                error: null
            }
        default:
            return state
    }
}