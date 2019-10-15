import Network from '../../lib/Network'
import { AsyncStorage } from 'react-native'
import {
  CHEKLIST_ANSWERS_SAVED,
  DISPLAY_CHECKLIST_ERROR,
  SET_INITIAL_CHECKLIST,
  CLEAR_CHECKLIST_ANSWERS,
  SET_SAFETY_DEVICES_CHECKLIST,
  SET_CURRENT_CHECK,
  SET_EXTERNAL_CHECKLIST,
  SET_CURRENT_TOOL,
  SET_NEXT_TOOL,
  SET_TOOL_PARAMS,
  SET_CURRENT_PROD,
} from "../../store/actionTypes";

import moment from 'moment-timezone'
import 'moment/locale/es'

import { setAssistanceUser } from '../failure/actions'

export function fetchInitialChecklist(machineId, checklistType) {
    return async (dispatch, getState) => {
        try {
            const checklist = await AsyncStorage.getItem('initialChecklist')
            if (checklist) {
                dispatch(setInitialChecklist(JSON.parse(checklist)))
            } else {
                const response = await Network.post('/machine/getMachineChecklist', {
                    checklist_type: checklistType,
                })
                if (response.success) {
                    await AsyncStorage.setItem('initialChecklist', JSON.stringify(response.data))
                    dispatch(setInitialChecklist(response.data))
                }
            }
        } catch (error) {
            dispatch(displayCheklistError(error))
        }
    }
}

export function fetchSafetyDevicesChecklist(machineId, checklistType) {
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/machine/getMachineChecklist', {
                machine_id: machineId,
                checklist_type: checklistType,
            })
            if (response.success) {
                dispatch(setSafetyDevicesChecklist(response.data))
            }
        } catch (error) {
            await AsyncStorage.removeItem('@AppStore:timer')
            dispatch(clearChecklistAnswers())
            dispatch(displayCheklistError(error))
        }
    }
}

export function fetchExternalChecklist(machineId, checklistType) {
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/machine/getMachineChecklist', {
                machine_id: machineId,
                checklist_type: checklistType,
            })
            if (response.success) {
                dispatch(setExternalChecklist(response.data))
            }
        } catch (error) {
            dispatch(displayCheklistError(error))
        }
    }
}

export function postChecklistAnswers(params, external) {
    return async (dispatch, getState) => {
        try {
            params.inicio = params.inicio || await AsyncStorage.getItem('@AppStore:timer-answers')
            params.fin = moment().format('YYYY-MM-DD HH:mm:ss')
            const response = await Network.post('/checklist/save', params)
            if (!response.success) {
                dispatch(displayCheklistError(response.err))
            } else {
                let data = {
                    shift: params.shift,
                    answersSaved: true
                }
                if(params.tadi){
                    dispatch(setAssistanceUser(response.data))
                }
                if(!external){
                    dispatch(checklistAnswersSaved(data))
                }
                await AsyncStorage.setItem('checkListStatus', JSON.stringify(data))
                await AsyncStorage.multiRemove(['@AppStore:timer-answers'])
            }
        } catch (error) {
            dispatch(displayCheklistError(error))
        }
    }
}

export function getChecklistAnswers(params) {
    return async (dispatch, getState) => {
        try {
            let data = false
            const response = await Network.post('/checklist/getChecklistShift', params)
            if(response.data.ID){
                data = {
                    shift: response.data.shift,
                    answersSaved: true
                }
            }else{
                await AsyncStorage.multiRemove(['checkListStatus'])
            }
            if (data) {
                if (params.shift === data.shift) {
                    await AsyncStorage.setItem('checkListStatus', JSON.stringify(data))
                    dispatch(checklistAnswersSaved(data))
                } else {
                    await AsyncStorage.multiRemove(['checkListStatus', '@AppStore:timer'])
                    dispatch(clearChecklistAnswers())
                }
            } else {
                dispatch(clearChecklistAnswers())
            }
        } catch (error) {
            dispatch(displayCheklistError(error))
        }
    };
}

export function setInitialChecklist(checklistItems) {
    return {
        type: SET_INITIAL_CHECKLIST,
        payload: checklistItems
    }
}

export function setSafetyDevicesChecklist(checklistItems) {
    return {
        type: SET_SAFETY_DEVICES_CHECKLIST,
        payload: checklistItems
    }
}

export function setExternalChecklist(checklistItems) {
    return {
        type: SET_EXTERNAL_CHECKLIST,
        payload: checklistItems
    }
}

export function displayCheklistError(error) {
    return {
        type: DISPLAY_CHECKLIST_ERROR,
        payload: error,
    }
}

export function checklistAnswersSaved(response) {
    return {
        type: CHEKLIST_ANSWERS_SAVED,
        payload: response,
    }
}

export function clearChecklistAnswers() {
    return {
        type: CLEAR_CHECKLIST_ANSWERS,
    }
}

export function setCurrentCheck(index) {
    return {
        type: SET_CURRENT_CHECK,
        payload: index,
    }
}