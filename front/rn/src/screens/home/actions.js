import Network from '../../lib/Network'
import { AsyncStorage, Platform } from 'react-native'
import { inRoom ,leaveRoom  } from '../../lib/Socket'
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
import I18n from '../../i18n/i18n';

export function fetchCurrentShiftLog(machineId, shift) {
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/report/getLog', {
                machine_id: machineId,
                shift: shift
            })
            if (response.success) {
                dispatch(setCurrentShiftLog(response))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export function postCommentToLog(machineId, message) {
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/shift/comment', {
                machine_id: machineId,
                comment: message,
            })
            if (response.success) {
                //dispatch(requestCurrentShiftLog(machineId, 'current'))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export function fetchProduction(day) {
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/hourproduction/getInfoShift/', {
                day: day
            })
            if (response.length !== 0) {
                dispatch(setProduction(response))
            } else {
                throw I18n.t('error_get_hour_by_hour')
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export function fetchToolSpeed(toolCode) {
    return async (dispatch, getState) => {
        try {
            const response = await Network.post(`/tools/getByCode?code=${toolCode}`)
            if (response.data) {
                dispatch(setToolSpeed(response.data))
            } else {
                throw I18n.t('error_get_tool')
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export function fetchCurrentPeriodDowntime(from, to) {
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/report/getOm', {
                day: from
            })
            if (response.success) {
                dispatch(setCurrentPeriodDowntime(response.data))
            } else {
                throw I18n.t('error_get_downtime')
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export function fetchCurrentFailure() {
    return async (dispatch, getState) => {
        try {
            let schema = await AsyncStorage.getItem('machine')
            inRoom((JSON.parse(schema)['name']))
            const response = await Network.get('/machine/getCurrentFailure')
            if (response.success) {
                console.log("------------------------")
                console.log(response.data)
                dispatch(setCurrentFailure(response.data))
            } else {
                dispatch(clearCurrentFailure())
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export function fetchLocalMachine() {
    return async (dispatch, getState) => {
        const localMachine = await AsyncStorage.getItem('machine')
        if (localMachine) {
            dispatch(setMachineData(JSON.parse(localMachine)))
        }
    }
}

export function checkIn(iotTag, userId, schema) {
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/machine/checkin', {
                iot_tag: iotTag,
                schema: schema,
                user_id: userId
            })
            if (response.success) {

                await AsyncStorage.setItem('machine', JSON.stringify(response.data))
                await AsyncStorage.setItem('schema', schema)
                inRoom(schema)
                dispatch(setMachineData(response.data))
            } else {
                throw I18n.t('error_checkin')
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export function checkOut() {
    return async (dispatch, getState) => {
        try {
            //const response = await Network.get('/machine/checkout')
            if (true) {
                let schema = await AsyncStorage.getItem('machine')
                leaveRoom(JSON.parse(schema)['name'])
                await AsyncStorage.multiRemove(['checkListStatus', 'initialChecklist', '@AppStore:timer', '@AppStore:timer-answers', 'changeOverCheckList', 'schema', 'machine'])
                dispatch(removeMachineData())
            } else {
                throw I18n.t('error_checkin')
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export function checkOutFull() {
    return async (dispatch, getState) => {
        try {
            //const response = await Network.get('/machine/checkout')
            if (true) {
                await AsyncStorage.multiRemove(['checkListStatus', 'initialChecklist', '@AppStore:timer', '@AppStore:timer-answers', 'changeOverCheckList', 'schema', 'machine'])
                dispatch(removeMachineDataFull())
            } else {
                throw I18n.t('error_checkin')
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export function updateLog(logId, comment) {
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/shift/updateLog', {
                log_id: logId,
                comment: comment
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function mergeDowntimes(current, list) {
    return async (dispatch, getState) => {
        try {
            list = list.map(a => { return {...a, report_type: current.report_type} } )

            const response = await Network.post('/report/mergeDowntimes', {
                current: current,
                list: list
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function splitDowntimes(list) {
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/report/splitDowntimes', {
                list: list.reverse()
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function deleteLog(logId) {
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/shift/deleteLog', {
                log_id: logId
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function setMachineData(machineData) {
    return {
        type: CHECK_IN,
        payload: machineData,
    }
}

export function removeMachineData() {
    return {
        type: CHECK_OUT,
    }
}

export function removeMachineDataFull() {
    return {
        type: CHECK_OUT_FULL,
    }
}

export function setCurrentFailure(data) {
    return {
        type: SET_CURRENT_FAILURE,
        payload: data,
    }
}

export function clearCurrentFailure() {
    return {
        type: CLEAR_CURRENT_FAILURE,
    }
}

export function setCurrentReport(data) {
    return {
        type: SET_CURRENT_REPORT,
        payload: data,
    }
}

export function setCurrentEscalation(data) {
    return {
        type: SET_CURRENT_ESCALATION,
        payload: data,
    }
}

export function setCurrentPeriodDowntime(data) {
    return {
        type: SET_CURRENT_PERIOD_DOWNTIME,
        payload: data,
    }
}

export function setToolSpeed(data) {
    return {
        type: SET_TOOL_SPEED,
        payload: data.DesignSpeed,
    }
}

export function setProduction(production) {
    return {
        type: SET_PRODUCTION,
        payload: production
    }
}


export function setCurrentShiftLog(logEntries) {
    return {
        type: SET_CURRENT_SHIFT_LOG,
        payload: logEntries
    }
}

export function reloadProduction() {
    return {
        type: RELOAD_PRODUCTION,
    }
}

export function reloadShift() {
    return {
        type: RELOAD_SHIFT,
    }
}

export function setCurrentTool(tool) {
    return {
        type: SET_CURRENT_TOOL,
        payload: tool
    }
}