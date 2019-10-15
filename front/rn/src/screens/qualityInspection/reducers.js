import {
	SET_QUALITY_TOOLS,
	SET_QUALITY_INSPECTION_LIST,
	SET_QUALITY_CHECKLIST_TRENDS,
	SET_QUALITY_INSPECTION_SHEET,
	SET_QUALITY_INSPECTION_ERROR,
	SET_QUALITY_TOOL_TRENDS,
	SET_QUALITY_WORK_ORDERS,
	SEARCH_TOOLS,
	GET_QUALITY_TREND_REPORT,
	GET_ACTUAL_TREND,
	SET_JULIAN_NUMBERS,
	SET_QUALITY_REPORT
} from "../../store/actionTypes";

const initialState = {
	error: null,
	inspection: null,
	sheet: null,
	tools: [],
	trends: null,
	tooltrends: [],
	trendReport: {data: null},
	actualTrend: null,
	julianNumbers: []
}

export function qualityInspectionReducer(state = initialState, action) {
	switch (action.type) {
		case SET_QUALITY_TOOLS:
			return { ...state, tools: action.payload, error: null }
		case SET_QUALITY_INSPECTION_LIST: 
			return { ...state, inspection: action.payload, error: null }
		case SET_QUALITY_CHECKLIST_TRENDS:
			return { ...state, trends: action.payload, error: null }
		case SET_QUALITY_INSPECTION_SHEET: 
			return { ...state, sheet: action.payload, error: null }
		case SET_QUALITY_TOOL_TRENDS:
			return { ...state, tooltrends: action.payload, error: null}
		case SET_QUALITY_WORK_ORDERS:
			return { ...state, workOrders: action.payload, error: null}
		case GET_ACTUAL_TREND:
			return { ...state, actualTrend: action.payload, error: null}
		case SET_JULIAN_NUMBERS:
			return { ...state, julianNumbers: action.payload, error: null}
		case SET_QUALITY_REPORT:
			return { ...state, trendReport: action.payload, error: null}
		case SEARCH_TOOLS:
			return { ...state, tools: action.payload, error: null }
		case GET_QUALITY_TREND_REPORT:
			return { ...state, trendReport: action.payload, error: null}
		case SET_QUALITY_INSPECTION_ERROR: 
			return { ...state, error: action.payload }
		default:
			return state;
	}
}