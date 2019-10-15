import { SET_ERROR } from "./types";
import api from '../../lib/api'
import messages_en from "../../i18n/en.json"
import messages_es from "../../i18n/es.json"

export function setComments(message, session) {

    return async (dispatch, getState) => {
        
        let data = {
            issue: {
                project_id: 717,
                subject: `${session.name} - ${message.substring(0, 20)}`,
                status_id: 1,
                priority_id: 10,
                assigned_to_id: 327,
                description: message
            }
        }
        let response = await api.post('/easyredmine', data)
        
        let sendComments = session.language === 'es' ?  messages_es['menu.agradeceComentario'] : messages_en['menu.agradeceComentario']
        let sendError = session.language === 'es' ? messages_es['menu.errorComentario'] : messages_en['menu.errorComentario']
        
        if (response.issue) {
            dispatch(setError(sendComments))
        } else {
            dispatch(setError(sendError))
        }
        
    }
}


export function setError(error) {
    return {
        type: SET_ERROR,
        payload: error
    }
}