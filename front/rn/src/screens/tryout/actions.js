
import Network from '../../lib/Network'
import {
    DISPLAY_ERROR_OUTS,
    SET_ISSUES_OUTS,
    SELECT_SINGLE_ISSUE_OUTS,
    SET_ASSISTANCE_USER_OUTS,
} from '../../store/actionTypes'
import I18n from '../../i18n/i18n';

export function getCodeTryOut(InternalCode_OutType) {
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/issue/getIssuesByOutType', {
                out_type_code: InternalCode_OutType
            })
            if (response.success) {
                dispatch(setIssuesOuts(response.data))
            } else {
                throw I18n.t('error_get_issue_types')
            }
        } catch (error) {
            
            dispatch({
                type: DISPLAY_ERROR_OUTS,
                payload: error,
            })
        }
    };
}
    

export function startTryout(issueID) {
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/try_out/startTryout', {
                issueID_param: issueID
            })
            // if (response.success) {
            //     dispatch(setIssuesOuts(response.data))
            // } else {
            //     throw I18n.t('error_get_issue_types')
            // }
        } catch (error) {
            
            dispatch({
                type: DISPLAY_ERROR_OUTS,
                payload: error,
            })
        }
    };
}


export function closeTryout(issueID) {
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/try_out/closeTryout', {
                issueID: issueID
            })

            if (response.success) {
                // dispatch(setIssuesOuts(response.data))
            } else {
                throw I18n.t('error_close_TryOut')
            }
        } catch (error) {
            
            dispatch({
                type: DISPLAY_ERROR_OUTS,
                payload: error,
            })
        }
    };
}



export function authorizationTryOut(tadi,issueID,active,internalCode){
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/try_out/authorizationTryOut/', {
                Tadi: tadi,
                IssueID: issueID,
                Active: active,
                InternalCode: internalCode
            })

            dispatch(setAssistanceUser(response.data))

            // if (response.success == true) {
            //     dispatch(setAssistanceUser(response.data))
            // } else {
            //     throw response.data
            // }
            
        } catch (error) {
            alert(error)
        }
    }
}



export function setIssuesOuts(issuesOuts) {
    return {
        type: SET_ISSUES_OUTS,
        payload: issuesOuts,
    }
}


export function selectSingleIssue(issuesOuts) {
    return {
        type: SELECT_SINGLE_ISSUE_OUTS,
        payload: issuesOuts,
    }
}

export function setAssistanceUser(data) {
    return {
        type: SET_ASSISTANCE_USER_OUTS,
        payload: data
    }
}
