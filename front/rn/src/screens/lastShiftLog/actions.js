import Network from '../../lib/Network'
import {
    SET_LAST_SHIFT_LOG,
    SET_LAST_SHIFT_RANGE,
    SET_LAST_SHIFT_DATE,
} from '../../store/actionTypes'

export function fetchLastShiftLog(machineId, shift, day) {
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/report/getLog', {
                machine_id: machineId,
                shift: shift,
                day: day
            })
            if (response.success) {
                dispatch(setLastShiftLog(response.data))
                dispatch(setLastShiftRange(response.range))
                dispatch(setLastShiftDate(response.toDate))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export function updateLog(logId, comment) {
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/machine/updateLog', {
                log_id: logId,
                comment: comment
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function deleteLog(logId) {
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/machine/deleteLog', {
                log_id: logId
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function setLastShiftLog(data) {
    return {
        type: SET_LAST_SHIFT_LOG,
        payload: data,
    }
}

export function setLastShiftRange(data) {
    return {
        type: SET_LAST_SHIFT_RANGE,
        payload: data,
    }
}

export function setLastShiftDate(data) {
    return {
        type: SET_LAST_SHIFT_DATE,
        payload: data,
    }
}
