import Network from "../../lib/Network";
import {
	SET_PROCESS_OBJECTIVES,
	SET_PROCESS_OBJECTIVES_REAL_VALUE,
	SET_PROCESS_PARAMETER_ERROR
} from "../../store/actionTypes";

export function getObjectives(objectiveId) {
	return async (dispatch, getState) => {
		try {
			const response = await Network.post('/objective/getObjective', { 
				tool : objectiveId
			})
			//console.log(response.data)
			if (response.success == true) {				
				dispatch(getProcessObjectives(response.data))
			}
		} catch (error) {
			dispatch(setProcessParameterError(error));
		}
	}	
}

export function addObjectivesRealValues(objectives) {
	return async (dispatch, getState) => {
		try {
			const response = await Network.post('/objective/updateReal', { 
				params : objectives
			})
			//console.log(response.data)
			if (response.success == true) {				
				dispatch(addObjectivesRealValue())
			} else {
			 	throw 'Error al actualizar los valores reales de los objetivos'
			}
		} catch (error) {
			dispatch((error));
		}
	}			
}

export function getProcessObjectives(data) {
	return {
		type: SET_PROCESS_OBJECTIVES,
		payload: data
	}
}

export function addObjectivesRealValue(data){
	return {
		type: SET_PROCESS_OBJECTIVES_REAL_VALUE
	}	
}

export function setProcessParameterError(data) {
	return {
		type: SET_PROCESS_PARAMETER_ERROR,
		payload: data
	}
}