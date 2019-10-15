import api from "../../lib/api";
import {
    SET_PARETOS_DOWNTIME,
    SET_TOOL_PERFORMANCE,
    SET_HOUR_STROKES,
    SET_PARETOS_CHANGEOVER,
    SET_TOOLS_CHANGEOVER,
    SET_KPIS,
    SET_SHIFT_KPIS,
    SET_GLOBAL_INDICATORS,
    SET_AFECTACIONES_EQES,
    SET_ERROR,
} from "./types";


export function fetchParetosDowntime(startDay, endDay) {
    return async (dispatch, getState) => {
        try {
            const response = await api.get("/kpi/getParetosDowntime?startDay=" + startDay+"&endDay=" + endDay);
            if (response.success) {
                dispatch(setParetosDowntime(response.data));
            }
        } catch (error) {
            dispatch(setError(error.error));
        }
    }
}


export function fetchToolsPerformance(startDay, endDay) {
    return async (dispatch, getState) => {
        try {
            const response = await api.get("/kpi/getToolsPerformance?startDay=" + startDay+"&endDay=" + endDay);
            if (response.success) {
                dispatch(setToolsPerformance(response.data));
            }
        } catch (error) {
            dispatch(setError(error.error));
        }
    }
}

export function fetchHourStrokes(day) {
    return async (dispatch, getState) => {
        try {
            const response = await api.get("/kpi/getHourStrokes?day=" + day);
            if (response.success) {
                dispatch(setHourStrokes(response.data));
            }
        } catch (error) {
            dispatch(setError(error.error));
        }
    }
}


export function fetchParetosChangeover(startDay, endDay) {
    return async (dispatch, getState) => {
        try {
            const response = await api.get("/kpi/getParetosChangeover?startDay=" + startDay+"&endDay=" + endDay);
            if (response.success) {
                dispatch(setParetosChangeover(response.data));
            }
        } catch (error) {
            dispatch(setError(error.error));
        }
    }
}

export function fetchToolsChangeover(startDay, endDay) {
    return async (dispatch, getState) => {
        try {
            const response = await api.get("/kpi/getToolsChangeover?startDay=" + startDay+"&endDay=" + endDay);
            if (response.success) {
                dispatch(setToolsChangeover(response.data));
            }
        } catch (error) {
            dispatch(setError(error.error));
        }
    }
}


export function fetchKpis(startDay, endDay) {
    return async (dispatch, getState) => {
        try {
            const response = await api.get("/kpi/getKpis?startDay=" + startDay+"&endDay=" + endDay);
            if (response.success) {
                dispatch(setKpis(response.data));
            }
        } catch (error) {
            dispatch(setError(error.error));
        }
    }
}


export function fetchShiftKpis(startDay, endDay) {
    return async (dispatch, getState) => {
        try {
            const response = await api.get("/kpi/getShiftKpis?startDay=" + startDay+"&endDay=" + endDay);
            if (response.success) {
                dispatch(setShiftKpis(response.data));
            }
        } catch (error) {
            dispatch(setError(error.error));
        }
    }
}

export function fetchGlobalIndicators(startDay, endDay) {
    return async (dispatch, getState) => {
        try {
            const response = await api.get("/kpi/getGlobalIndicators?startDay=" + startDay+"&endDay=" + endDay);
            if (response.success) {
                dispatch(setGlobalIndicators(response.data));
            }
        } catch (error) {
            dispatch(setError(error.error));
        }
    }
}

export function fetchAfectacionEqes(startDay, endDay) {
    return async (dispatch, getState) => {
        try {
            const response = await api.get("/kpi/getAfectacionEqes?startDay=" + startDay+"&endDay=" + endDay);
            if (response.success) {
                dispatch(setAfectacionEqes(response.data));
            }
        } catch (error) {
            dispatch(setError(error.error));
        }
    }
}

export function setParetosDowntime(data) {
    return {
        type: SET_PARETOS_DOWNTIME,
        payload: data
    }
}

export function setToolsPerformance(data) {
    return {
        type: SET_TOOL_PERFORMANCE,
        payload: data
    }
}

export function setHourStrokes(data) {
    return {
        type: SET_HOUR_STROKES,
        payload: data
    }
}

export function setParetosChangeover(data) {
    return {
        type: SET_PARETOS_CHANGEOVER,
        payload: data
    }
}

export function setToolsChangeover(data) {
    return {
        type: SET_TOOLS_CHANGEOVER,
        payload: data
    }
}

export function setKpis(data) {
    return {
        type: SET_KPIS,
        payload: data
    }
}

export function setShiftKpis(data) {
    return {
        type: SET_SHIFT_KPIS,
        payload: data
    }
}

export function setGlobalIndicators(data) {
    return {
        type: SET_GLOBAL_INDICATORS,
        payload: data
    }
}

export function setAfectacionEqes(data) {
    return {
        type: SET_AFECTACIONES_EQES,
        payload: data
    }
}

export function setError(error) {
    return {
        type: SET_ERROR,
        payload: error
    }
}
