import Network from "../../lib/Network";
import {
	SET_QUALITY_TOOLS,
	SET_QUALITY_INSPECTION_LIST,
	SET_QUALITY_CHECKLIST_TRENDS,
	SET_QUALITY_INSPECTION_SHEET,
	SET_QUALITY_INSPECTION_ERROR,
	SET_QUALITY_TOOL_TRENDS,
	SET_QUALITY_WORK_ORDERS,
	GET_QUALITY_TREND_REPORT,
	SEARCH_TOOLS,
	GET_ACTUAL_TREND,
	SET_JULIAN_NUMBERS,
	SET_QUALITY_REPORT
} from "../../store/actionTypes";


export function getActualTrend(toolID){
	return async (dispatch, getState) => {
		try{
			var response = await Network.get('/inspections/'+toolID+'/actual');
			if(response.success){
				dispatch(setActualTrend(response.data));
			}
		}catch(error){
			dispatch(setQualityInspectionError(error));
		}
	}
}

export function searchTools(expression){
	return async (dispatch, getState) => {
		try{
			var url = '/tools/getByFilter?' + expression;
			const response = await Network.get(url);
			if(response.success){
				dispatch(foundTools(response.data));
			}else{
				dispatch(foundTools([]))
			}
		}catch(error){	
			dispatch(setQualityInspectionError(error));
		}
	}
			
}

export function getTrendReport(toolID){
	return async (dispatch, getState) => {
		try{
			var URL = '/report/trendsReport/' + toolID;
			const response = await Network.get(URL);
			if(response.success){
				dispatch(setTrendReport(response.data));
			}
		}catch(error){	
			dispatch(setQualityInspectionError(error));
		}
	}
}

export function getDailyReport() {
	return async (dispatch, getState) => {
		try {
			//const response = await Network.get('/dailyreport?orderBy=inicio&orderDir=DESC&where={"status":{">=":3}}')
			const response = await Network.get('/tools?limit=50')
			if (response) {
				dispatch(setDailyReport(response))
			}
		} catch (error) {
			dispatch(setQualityInspectionError(error));
		}
	}	
}

export function getJulianNumbers(ToolID){
	return async (dispatch, getState) => {
		try{
			const response = await Network.get('/julian_numbers/'+ToolID);
			console.log("RESPONSE", response);
			if(response){
				dispatch(setJulianNumbers(response));
			}
		} catch (error) {
			dispatch(setQualityInspectionError(error));
		}
	}
}

export function getToolTrends(ToolID){
	return async(dispatch, getState) =>{
		try{
			const response = await Network.get('/inspections/' + ToolID);
			console.log("RESPONSE GET TOOL TRENDS", response);
			response && dispatch(setToolTrends(response.data));
		}catch(error){
			dispatch(setQualityInspectionError(error))
		}
	}
}

export function getWorkOrders(ToolID) {
	return async (dispatch) => {
		try {
			const response = await Network.get('/workorders/getLastsByTool/' + ToolID)
			console.log("RESPONSE GET WORK ORDERS", response);
			response && dispatch(setWorkOrders(response.data));
		} catch (error) {
			dispatch(setQualityInspectionError(error))
		}
	}
}

export function getChecklistTrends(id) {
	return async (dispatch, getState) => {
		try {
			const response = await Network.get(`/inspections/${id}/approval`)
			console.log("APPROVAL", response);
			if (response) {
				dispatch(setChecklistTrends(response))
			}
		} catch (error) {
			dispatch(setQualityInspectionError(error));
		}
	}	
}


export function getInspectionList(id) {
	return async (dispatch, getState) => {
		try {
			const response = await Network.get('/inspection/getInspections/' + id)
			if (response.success) {
				dispatch(setInspectionList(response.data))
			}
		} catch (error) {
			dispatch(setQualityInspectionError(error));
		}
	}	
}

export function getInspectionSheet(id = null, dummy = false, toolID = null) {
	return async (dispatch, getState) => {
		try {
			const response = await Network.get('/inspection_check_lists/' + toolID)
			console.log("RESPONSE FULL SHEET " + toolID, response);
			if (response.success) {
				dispatch(setInspectionSheet(response.data))
			}else{
				dispatch(setInspectionSheet(response.err))
			}
		} catch (error) {
			dispatch(setQualityInspectionError(error));
		}
	}
}

export function newInspection(data) {
    return async (dispatch, getState) => {
        try {
            const response = await Network.post('/inspections', data);
            if (response.success == false){
                throw 'Error al ingresar nuevo report'
            }
        } catch (error) {
            console.error(error)
        }
    }
}

export function getReport(toolID, day) {
	return async (dispatch, getState) => {
		try {
			const response = await Network.get(`/inspections/report/${toolID}?day=${day}`)
			if (response.success) {
				console.log("QUALITY REPORT", response);
				dispatch(setReport(response))
			}
		} catch (error) {
			dispatch(setQualityInspectionError(error));
		}
	}
}

export function setActualTrend(data){
	return {
		type: GET_ACTUAL_TREND,
		payload: data
	}
}

export function foundTools(data){
	return {
		type: SEARCH_TOOLS,
		payload: data
	}
}

export function setJulianNumbers(data){
	return {
		type: SET_JULIAN_NUMBERS,
		payload: data
	}
}

export function setTrendReport(data){
	return {
		type: GET_QUALITY_TREND_REPORT,
		payload: data
	}
}

export function setToolTrends(data){
	return {
		type: SET_QUALITY_TOOL_TRENDS,
		payload: data
	}
}

export function setWorkOrders(data){
	return {
		type: SET_QUALITY_WORK_ORDERS,
		payload: data
	}
}

export function setChecklistTrends(data) {
	return {
		type: SET_QUALITY_CHECKLIST_TRENDS,
		payload: data
	}
}

export function setInspectionSheet(data) {
	return {
		type: SET_QUALITY_INSPECTION_SHEET,
		payload: data
	}
}

export function setInspectionList(data) {
	return {
		type: SET_QUALITY_INSPECTION_LIST,
		payload: data
	}
}

export function setDailyReport(data) {
	return {
		type: SET_QUALITY_TOOLS,
		payload: data
	}
}

export function setQualityInspectionError(data) {
	return {
		type: SET_QUALITY_INSPECTION_ERROR,
		payload: data
	}
}

export function setReport(data) {
	return {
		type: SET_QUALITY_REPORT,
		payload: data
	}
}