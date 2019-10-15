import Network from '../../lib/Network'
import { AsyncStorage } from 'react-native'
import {
    SET_ALL_COMMENTS,
    SET_FAILURE_LOG,
    CLEAR_COMMENTS,
    SET_ASSISTANCE_USER,
    CLEAR_ASSISTANCE_USER,
    SET_REPORT,
    SET_DOWNTIME_HISTORIC,
    SET_WORKORDERS_MAXIMO
} from '../../store/actionTypes'

import moment from 'moment-timezone'
import 'moment/locale/es'
import I18n from '../../i18n/i18n';

export function fetchComments(reportId) {
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/forum/getComment/', {
                id: reportId
            })
            if (response.success == true) {
                dispatch(setComments(response))
            } else {
                throw I18n.t('error_get_fail_comments')
            }
        } catch (error) {
            console.error(error)
        }
    }
}

export function asistenciaLog(reportId){
    return async (dispatch, getState) => {
        try {
            console.log("************************************ ASISTENCIA **********************************")
            console.log(reportId)
            const response = await Network.post('/report/escalationLog/', {
                reportId: reportId
            })
            if (response.success == true) {
                dispatch(setLog(response))
            } else {
                throw I18n.t('error_get_assistance_log')
            }
        } catch (error) {
            console.error(error)
        }
    }
}

export function manualEscalation(reportId){
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/report/manualEscalation/', {
                reportId: reportId
            })
            if (response.success == false) {
                throw I18n.t('error_escaling_stop')
            }
        } catch (error) {
            console.error(error)
        }
    }
}

export function manualAssist(reportId, tadi){
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/report/manualAssist/', {
                reportId: reportId,
                tadi: tadi
            })
            if (response.success == true) {
                dispatch(setAssistanceUser(response.data))
            } else {
                throw response.data
            }
        } catch (error) {
            alert(error)
        }
    }
}

export function checkInTadi(tadi, user, machine){
    return async (dispatch, getState) => {
        try {
            let start = await AsyncStorage.getItem('@AppStore:timer')
            let end = moment().format('YYYY-MM-DD HH:mm:ss')
            const response = await Network.post('/checklist/saveLog/', {
                tadi: tadi,
                start: start,
                end: end,
                user: user,
                machine: machine,
            })
            if (response.success == true) {
                dispatch(setAssistanceUser(response.data))
                await AsyncStorage.removeItem('@AppStore:timer')
            } else {
                throw response.data
            }
        } catch (error) {
            alert(error)
        }
    }
}

export function setReportData(reportId){
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/report/getReport/', {
                reportId: reportId,
            })
            if (response.success == true) {
                dispatch(setReport(response.data))
            } else {
                throw response.data
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export function setHistoricData(reportId){
    return async (dispatch, getState) => {
        try {
            //Se cambia el servicio de historico de agrupacion
            const response = await Network.post('/report/getLogDetail', {
                id: reportId,
            })
            if (response.success == true) {
                dispatch(setDowntimeHistoric(response.data))
            } else {
                throw response.data
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export function newComment(reportId, data, user, type) {
    return async (dispatch, getState) => {
        try {
            if(!type){
                type = 'comment'
            }
            const response = await Network.post('/forum/newComment/', {
                id: reportId, data: data, user: user, type:type
            })
            if (response.success == false) {
                throw 'Error al agregar nuevo comentario'
            }
        } catch (error) {
            console.error(error)
        }
    }
}

export function createReport(reportId, data, user, type) {
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/report/createReport/')
            if (response.success == false) {
                throw I18n.t('error_adding_stop')
            }
        } catch (error) {
            console.error(error)
        }
    }
}

export function getWorkOrdersMaximo(day){
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/report/getWorkOrdersMaximo', {
                day: day,
            })
            
            if (response.success == true) {
                console.log(response.shift)
                dispatch(setWorkOrdersMaximo(response))
            } else {
                throw response.data
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export function cleanComments(data){
    return {
        type: CLEAR_COMMENTS,
        payload: data,
    }
}

export function setComments(data) {
    return {
        type: SET_ALL_COMMENTS,
        payload: data
    }
}

export function setLog(data) {
    return {
        type: SET_FAILURE_LOG,
        payload: data
    }
}

export function setAssistanceUser(data) {
    return {
        type: SET_ASSISTANCE_USER,
        payload: data
    }
}

export function setReport(data) {
    return {
        type: SET_REPORT,
        payload: data
    }
}

export function setDowntimeHistoric(data) {
    return {
        type: SET_DOWNTIME_HISTORIC,
        payload: data
    }
}

export function clearAssistanceUser(data) {
    return {
        type: CLEAR_ASSISTANCE_USER,
        payload: null
    }
}

export function setWorkOrdersMaximo(data) {
    return {
        type: SET_WORKORDERS_MAXIMO,
        payload: data.data,
        shift: data.shift
    }
}