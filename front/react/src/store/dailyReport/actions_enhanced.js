import api from "../../lib/api";
import {
  SET_SHIFTS,
  SET_SHIFTS_STROKES,
  SET_AREA_DOWNTIMES,
  SET_ERROR,
  SET_SUMMARY_STROKES,
  SET_SECOND_SHIFT_DETAIL,
  SET_FIRST_SHIFT_DETAIL,
  SET_TOOL_REPORTS,
  SET_ROLLOS,
  SET_DPR
} from "./types";

export function fetchShifts(date) {
  return async (dispatch, getState) => {
    try {
      const response = await api.get('/shifts', { day: date });
      dispatch(setShifts(response));
    } catch (error) {
      dispatch(setError(error.error));
    }
  }
}

export function fetchDowntimesPerArea(from, to) {
  return async (dispatch, getState) => {
    try {
      const response = await api.get("/daily_production_reports_enhanced/get_om", { val1: from, val2: to });
      dispatch(setAreaDowntimes(response));
    } catch (error) {
      dispatch(setError(error.error));
    }
  }
}

export function fetchShiftsRealStrokesHeader(shifts) {
  return async (dispatch, getState) => {
    try {
      let _shifts = Object.keys(shifts).map(key => shifts[key])

      console.log("_shifts: ",_shifts);
      let shiftsPromises = _shifts.map(async (shift) => {
        return await api.get("/daily_production_reports_enhanced/get_real_strokes_header", { val1: shift.startAt, val2: shift.endAt });
      })
      console.log("shiftsPromises: ",shiftsPromises);
      let shiftsStrokes = await Promise.all(shiftsPromises);
      shiftsStrokes = shiftsStrokes.map((shiftStroke, i) => {
        return { ...shiftStroke, ..._shifts[i] }
      })

      console.log("shiftsStrokes: ",shiftsStrokes);

      let detailsPromises = _shifts.map(async (shift) => {
        return await api.get("/daily_production_reports_enhanced/get_shift_detail", { val1: shift.startAt, val2: shift.endAt });
      })
      console.log("detailsPromises: ",detailsPromises);

      let shiftsDetails = await Promise.all(detailsPromises);
      shiftsDetails = shiftsDetails.map((shiftDetail, i) => {
        return { details: shiftDetail || [], ...shiftsStrokes[i] }
      })
      console.log("shiftsDetails: ",shiftsDetails);

      dispatch(setShiftsStrokes(shiftsDetails));
    } catch (error) {
      console.log(error)
      dispatch(setError(error.error))
    }
  }
}


export function fetchRealStrokesHeader(from, to, id) {
  return async (dispatch, getState) => {
    try {
      const response = await api.get("/daily_production_reports_enhanced/get_real_strokes_header", { val1: from, val2: to });

      let data = [{ "tools": 0, "tnd": null, "gspm": null, "golpes": null, "scrap": null, "paros": null, "retrabajo": null, "num_juliano": null, "changeover": null, "percentageOaPr": null }]
      
      if (response.length !== 0) {
        data = response
      }

      if (id === "Resumen") {
        dispatch(setStrokesSummary(data));
      }

    } catch (error) {
      dispatch(setError(error.error));
    }
  }
}

export function fetchDailyReportData(from, to) {
  return async (dispatch, getState) => {
    try {
      const response = await api.get("/daily_production_reports_enhanced/get_daily_production_report", { val1: from, val2: to });

      let data = [{ "headerPrincipal": {}, "shiftDetails": [{}], "gspm": null, "golpes": null, "scrap": null, "paros": null, "retrabajo": null, "num_juliano": null, "changeover": null, "percentageOaPr": null }]
   
      if (response.length !== 0) {
        data = response
      }

      console.log("Data: ",data);
      
      dispatch(setDPR(data));

    } catch (error) {
      dispatch(setError(error.error));
    }
  }
}

export function fetchDailyReportDetail(from, to, id) {
  return async (dispatch, getState) => {
    try {
      const response = await api.get("/daily_production_reports_enhanced/get_shift_detail", { "val1": from, "val2": to, "id": id });
      if (id === "Turno1") {
        dispatch(setFirstShiftDetail(response));
      } else if (id === "Turno2") {
        dispatch(setSecondShiftDetail(response));
      }
    } catch (error) {
      dispatch(setError(error.error));
    }
  }
}

export function fetchToolReports(from, to, tool, id, workOrder) {
  return async (dispatch, getState) => {
    try {
      const response = await api.get("/daily_production_reports_enhanced/get_real_strokes_tool", { "val1": from, "val2": to, "tool": tool, "work_order_id": workOrder });
      const data = {
        tool: `${workOrder}-${id}`,
        data: response
      }
      dispatch(setToolReports(data))
    } catch (error) {
      dispatch(setError(error.error));
    }
  }
}

export function fetchRollos(from, to, tool, id) {
  return async (dispatch, getState) => {
    try {
      /*const response = await api.post("/reports/getToolRollo", { "val1": from, "val2": to, "tool": tool });
      const data = {
        tool: `${tool}-${id}`,
        data: response
      }*/
      let data = {}
      dispatch(setRollos(data));
    } catch (error) {
      dispatch(setError(error.error));
    }
  }
}

export function setShifts(data) {
  return {
    type: SET_SHIFTS,
    payload: data
  }
}

export function setShiftsStrokes(data) {
  return {
    type: SET_SHIFTS_STROKES,
    payload: data
  }
}

export function setAreaDowntimes(downtimes) {
  return {
    type: SET_AREA_DOWNTIMES,
    payload: downtimes
  }
}


export function setDPR(data) {
  return {
    type: SET_DPR,
    payload: data
  }
}

export function setStrokesSummary(data) {
  return {
    type: SET_SUMMARY_STROKES,
    payload: data
  }
}

export function setFirstShiftDetail(data) {
  return {
    type: SET_FIRST_SHIFT_DETAIL,
    payload: data
  }
}

export function setSecondShiftDetail(data) {
  return {
    type: SET_SECOND_SHIFT_DETAIL,
    payload: data
  }
}

export function setError(error) {
  return {
    type: SET_ERROR,
    payload: error
  }
}

export function setToolReports(data) {
  return {
    type: SET_TOOL_REPORTS,
    payload: data
  }
}

export function setRollos(data) {
  return {
    type: SET_ROLLOS,
    payload: data
  }
}