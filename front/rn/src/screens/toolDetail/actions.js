import Network from '../../lib/Network'
import {
    CLEAR_DOWNTIMES,
    SET_DOWNTIMES,
    SET_DOWNTIME,
    SET_DAILY_REPORT,
    SET_TOOL_REPORTS,
    SET_ALL_TOOLS,
} from '../../store/actionTypes'
import I18n from '../../i18n/i18n';

export function newReport(id, open_minutes, type, machine) {
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/dailyreport/newDowntime', {
                id: id,
                open_minutes: open_minutes,
                type: type,
                machine: machine
            })
            if (response.success == false){
                throw I18n.t('error_insert_report')
            }
        } catch (error) {
            console.error(error)
        }
    }
}

export function updateReport(data) {
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/dailyreport/updateLog', {
                data: data
            })
            if (response.success == false){
                throw I18n.t('error_update_daily_report')
            }
        } catch (error) {
            console.error(error)
        }
    }
}

export function fetchDowntimes(id) {
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/dailyreport/getDowntimes', {
                id: id
            })
            if (response.success == true){
                dispatch(setDowntimes(response))
            } else {
                throw I18n.t('error_get_downtime')
            }
        } catch (error) {
            console.error(error)
        }
    }
}

export function fetchDowntime(from, to) {
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/report/getOm', {
                val1: from, val2: to
            })
            if (response.success) {
                dispatch(setDowntime(response.data))
            } else {
                throw I18n.t('error_get_downtime')
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export function fetchDailyReport(day) {
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/dailyreport/getList', {
                day: day
            })
            if (response.success == true){
                dispatch(setDailyReport(response))
            } else {
                throw I18n.t('error_get_daily_report')
            }
        } catch (error) {
            console.error(error)
        }
    }
}

export function fetchToolReports(toolCode, start, end) {
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/report/getToolReports', {
                tool: toolCode, start: start, end: end
            })
            if (response.success == true) {
                dispatch(setToolReports(response))
            } else {
                throw I18n.t('error_get_hour_by_hour')
            }
        } catch (error) {
            console.error(error)
        }
    }
}

export function fetchTools() {
    return async (dispatch, getState) => {
        try {
            const response = await Network.get('/tool', {}, {})
            if (response) {
                dispatch(setTools(response))
            } else {
                throw I18n.t('error_get_tools')
            }
        } catch (error) {
            console.error(error)
        }
    }
}

export function setTools(data) {
    return {
        type: SET_ALL_TOOLS,
        payload: data.data
    }
}

export function setToolReports(data) {
    return {
        type: SET_TOOL_REPORTS,
        payload: data.data
    }
}

export function setDailyReport(data) {
    return {
        type: SET_DAILY_REPORT,
        payload: data.data
    }
}

export function setDowntimes(data) {
    return {
        type: SET_DOWNTIMES,
        payload: data.data
    }
}

export function setDowntime(data) {
    return {
        type: SET_DOWNTIME,
        payload: data
    }
}

export function clearDowntimes() {
    return {
        type: SET_DOWNTIMES,
        payload: []
    }
}