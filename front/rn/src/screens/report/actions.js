import Network from '../../lib/Network'
import { AsyncStorage } from 'react-native'
import {
    SET_ISSUE_TYPES,
    DISPLAY_ERROR,
    SELECT_ISSUE_TYPE,
    DESELECT_ISSUE_TYPE,
    SHOW_SUCCESSFUL_MESSAGE,
    SET_ISSUES,
    FAILURE_IDENTIFIED,
    SET_ABNORNALITY_COMMENT,
    SELECT_SINGLE_ISSUE,
    WORK_ORDER_MAXIMO_CREATED,
    WORK_ORDER_MAXIMO_UPDATED,
    WORK_ORDER_MAXIMO_CREATED_SFMS,
    WORK_ORDER_MAXIMO_UPDATED_SFMS,
    WORK_ORDER_MAXIMO_EXISTS_SFMS,
    CURRENT_DOWNTIME_TOOL
} from '../../store/actionTypes'
import I18n from '../../i18n/i18n';

export function fetchIssueTypes() {
    return async (dispatch, getState) => {
        try {
            const response = await Network.get('/issue/getAllIssues')
            if (response.success) {
                dispatch(setIssueTypes(response.data))
            } else {
                throw I18n.t('error_get_issue_types')
            }
        } catch (error) {
            dispatch({
                type: DISPLAY_ERROR,
                payload: error,
            })
        }
    }
}

export function fetchIssuesByType(issueType, report_type,is_out,is_try_out1) {
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/issue/getIssuesByIssueType', {
                issue_type_id: issueType,
                report_type: report_type,
                is_out: is_out,
                is_try_out1: is_try_out1
            })
            if (response.success) {
                dispatch(setIssues(response.data))
            } else {
                throw I18n.t('error_get_issue_types')
            }
        } catch (error) {
            dispatch({
                type: DISPLAY_ERROR,
                payload: error,
            })
        }
    };
}

export function sendReport(issueTypes, machineId) {
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/appinfo/requestAssistance', {
                issue_types: issueTypes,
                machine_id: machineId
            })
            if (response.success) {
                dispatch(showSuccessMessage(I18n.t('error_issue_reported')))
            } else {
                throw I18n.t('error_set_issue_types')
            }
        } catch (error) {
            dispatch({
                type: DISPLAY_ERROR,
                payload: error,
            })
        }
    }
}

export function assignFailure(report, issue, type, loteRollo) {
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/report/assignFailure', {
                report_id: report,
                issue_id: issue,
                report_type: type,
                loteRollo: loteRollo,
            })
            if (response.success) {
                dispatch(failureIdentified())
            } else {
                throw I18n.t('error_set_issue_types')
            }
        } catch (error) {
            dispatch({
                type: DISPLAY_ERROR,
                payload: error,
            })
        }
    }
}

export function checkExistsWOMSFMS(id) {
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/report/existsWorkOrderMaximo', {
                dtId: id
            })
            dispatch(workOrderMaximoExistsSFMS(response))
        } catch (error) {
            dispatch({
                type: DISPLAY_ERROR,
                payload: error,
            })
        }
    }
}

export function createWorkOrderMaximo(data) {
    return async (dispatch, getState) => {
        try {
            let headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
            await fetch('https://api.metalsa.com/odix/api/workorder/prod/create', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data || {})
            }).then((response) => response.json()
            ).then((response) => {
                if (response.message == null && response.correct == null && response.wonum != null) {
                    response.correct = true
                } else {
                    let message = "BMX-Error" + response.status
                    response.correct = false;
                    response.description = data.description
                    response.message = message
                    response.location = data.location
                    response.siteid = data.siteid
                    response.orgid = data.orgid
                    response.wopriority = data.wopriority
                }
                response.showAlert = true
                dispatch(workOrderMaximoCreated(response, response.correct == true))
            });
        } catch (error) {
            response = {}
            response.description = data.description
            response.correct = false
            response.wonum = null
            response.workorder_id = null
            response.message = "BMX-Timeout catch"
            response.description = data.description
            response.showAlert = true
            response.location = data.location
            response.siteid = data.siteid
            response.orgid = data.orgid
            response.wopriority = data.wopriority
            dispatch(workOrderMaximoCreated(response, response.correct))
        }
    }
}

export function updateWorkOrderMaximo(data) {
    return async (dispatch, getState) => {
        try {
            console.log("update",JSON.stringify(data || {}))
            let headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
            //QA
            await fetch('https://api.metalsa.com/odix/api/workorder/prod/update', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data || {})
            })
            .then((response) => response.json())
            .then((response) => {
                if (response.message == "OK" && response.correct) {
                    response.correct = true
                } else {
                    response.correct = false;
                }
                response.showAlert = true
                dispatch(workOrderMaximoUpdated(response, response.correct))
            });
        } catch (error) {
            console.log(error)
            dispatch({
                type: DISPLAY_ERROR,
                payload: error,
            })
        }
    }
}

export function createWorkOrderMaximoSFMS(data) {
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/report/createWorkOrderMaximo', data)
            if (response.success) {
                dispatch(workOrderMaximoSFMSCreated(true))
            } else {
                throw I18n.t('error_set_issue_types')
            }
        } catch (error) {
            console.log(error)
            dispatch({
                type: DISPLAY_ERROR,
                payload: error,
            })
        }
    }
}

export function updateWorkOrderMaximoSFMS(data) {
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/report/updateWorkOrderMaximo', data)
            if (response.success) {
                dispatch(workOrderMaximoSFMSUpdated(true))
            } else {
                throw I18n.t('error_set_issue_types')
            }
        } catch (error) {
            console.log(error)
            dispatch({
                type: DISPLAY_ERROR,
                payload: error,
            })
        }
    }
}

export function getToolCurrentDT(id) {
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/report/getToolCurrentDT', {
                reportId: id
            })
            dispatch(setToolCurrentDT(response))
        } catch (error) {
            dispatch({
                type: DISPLAY_ERROR,
                payload: error,
            })
        }
    }
}

export function showSuccessMessage(message) {
    return {
        type: SHOW_SUCCESSFUL_MESSAGE,
        payload: message
    }
}

export function setAbnormalityComment(issueType) {
    return {
        type: SET_ABNORNALITY_COMMENT,
        payload: issueType
    }
}

export function selectIssueType(issueType) {
    return {
        type: SELECT_ISSUE_TYPE,
        payload: issueType
    }
}

export function deselectIssueType(issueType) {
    return {
        type: DESELECT_ISSUE_TYPE,
        payload: issueType
    }
}

export function setIssueTypes(issueTypes) {
    return {
        type: SET_ISSUE_TYPES,
        payload: issueTypes,
    }
}

export function setIssues(issues) {
    return {
        type: SET_ISSUES,
        payload: issues,
    }
}

export function failureIdentified() {
    return {
        type: FAILURE_IDENTIFIED,
        payload: true,
    }
}

export function selectSingleIssue(issue) {
    return {
        type: SELECT_SINGLE_ISSUE,
        payload: issue,
    }
}

export function workOrderMaximoCreated(data, correct) {
    return {
        type: WORK_ORDER_MAXIMO_CREATED,
        payload: data,
        correct: correct
    }
}

export function workOrderMaximoUpdated(data, correct) {
    return {
        type: WORK_ORDER_MAXIMO_UPDATED,
        payload: data,
        correct: correct
    }
}

export function workOrderMaximoSFMSCreated() {
    return {
        type: WORK_ORDER_MAXIMO_CREATED_SFMS,
        payload: true,
    }
}

export function workOrderMaximoSFMSUpdated() {
    return {
        type: WORK_ORDER_MAXIMO_UPDATED_SFMS,
        payload: true,
    }
}

export function workOrderMaximoExistsSFMS(data) {
    return {
        type: WORK_ORDER_MAXIMO_EXISTS_SFMS,
        payload: data.wom,
        exists: data.exists
    }
}

export function setToolCurrentDT(data) {
    return {
        type: CURRENT_DOWNTIME_TOOL,
        payload: data.data
    }
}