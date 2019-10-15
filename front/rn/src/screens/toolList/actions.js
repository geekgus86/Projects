import Network from '../../lib/Network'
import {
    SET_TOOL_LIST,
} from '../../store/actionTypes'
import I18n from '../../i18n/i18n';

export function fetchToolsProduction(day) {
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/hourproduction/getInfoShift/', {
                day: day
            })
            if (response.success == true) {
                dispatch(setToolList(response))
            } else {
                throw I18n.t('error_get_hour_by_hour')
            }
        } catch (error) {
            console.error(error)
        }
    }
}

export function setToolList(data) {
    return {
        type: SET_TOOL_LIST,
        payload: data
    }
}