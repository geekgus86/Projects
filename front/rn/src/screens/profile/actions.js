import Network from '../../lib/Network'
import { AsyncStorage, Platform } from 'react-native'
import {
    CLEAR_SESSION_DATA,
    DISPLAY_AUTH_ERROR,
    SET_KPIS,
    SET_KPIS_DATE,
    SHOW_SUCCESSFUL_MESSAGE
} from '../../store/actionTypes'

import { removeMachineData, checkOut, checkOutFull } from '../home/actions'
import I18n from '../../i18n/i18n';

export function logoutUser() {
    return async (dispatch, getState) => {
        try {
            await Network.del('/auth/logout')
            dispatch(clearSession())
        } catch (error) {
            dispatch({
                type: DISPLAY_AUTH_ERROR,
                payload: error,
            })
        }
    }
}

export function reportIssueRedmine(email, comment){
    let comment20 = (comment.length > 20) ? comment.slice(0,20) : comment;
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('https://metalsa.easyredmine.com/issues?format=json&key=f28d16974e7fedc2cb6365ec1c4f0e6e2ba9205b', {
                "issue": {
                  "project_id": 717,
                  "subject":`${email} - ${comment20}`,
                  "status_id": 1,
                  "priority_id": 10,
                  "assigned_to_id": 327,
                  "description" : comment
                }
              })
              console.log(response);
            if (response.success == true) {
                console.log(response.data);
                dispatch(showSuccessMessage(I18n.t('issue_enviado_correctamente')))
            } else {
                throw response.data
            }
        } catch (error) {
            alert(error)
        }
    }
}

export function clearSession() {
    return async (dispatch, getState) => {
        try {
            await AsyncStorage.multiRemove(['checkListStatus', 'sessionToken', 'sessionData', 'initialChecklist', '@AppStore:timer', '@AppStore:timer-answers', 'changeOverCheckList', 'schema', 'machine'])
            dispatch(clearUserSession())
            dispatch(checkOutFull())
        } catch (error) {
            dispatch({
                type: DISPLAY_AUTH_ERROR,
                payload: error,
            })
        }
    }
}

export function fetchKpis(machineId, day) {
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/machine/compareKPIS', {
                machine_id: machineId,
                day: day,
            })
            if (response.success) {
                dispatch(setKpis(response.data))
                dispatch(setKpisDate(response.toDate))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export function clearUserSession() {
    return {
        type: CLEAR_SESSION_DATA,
    }
}

export function showSuccessMessage(message) {
    return {
        type: SHOW_SUCCESSFUL_MESSAGE,
        payload: message
    }
}

export function setKpis(data) {
    return {
        type: SET_KPIS,
        payload: data,
    }
}

export function setKpisDate(data) {
    return {
        type: SET_KPIS_DATE,
        payload: data,
    }
}