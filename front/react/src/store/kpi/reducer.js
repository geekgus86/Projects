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

const initialState = {
  paretosDowntime: null,
  toolsPerformance: null,
  hourStrokes: null,
  paretosChangeover: null,
  toolsChangeover: null,
  kpis: null,
  shiftKpis: null,
  globalIndicators: null,
  afectEqes: null,
  error: null
};

export function kpisReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PARETOS_DOWNTIME:
      return { ...state, paretosDowntime: action.payload, error: null }
    case SET_TOOL_PERFORMANCE:
      return { ...state, toolsPerformance: action.payload, error: null }
    case SET_HOUR_STROKES:
      return { ...state, hourStrokes: action.payload, error: null }
    case SET_PARETOS_CHANGEOVER:
      return { ...state, paretosChangeover: action.payload, error: null }
    case SET_TOOLS_CHANGEOVER:
      return { ...state, toolsChangeover: action.payload, error: null }
    case SET_KPIS:
      return { ...state, kpis: action.payload, error: null }
    case SET_SHIFT_KPIS:
      return { ...state, shiftKpis: action.payload, error: null }
    case SET_GLOBAL_INDICATORS:
      return { ...state, globalIndicators: action.payload, error: null }
    case SET_AFECTACIONES_EQES:
      return { ...state, afectEqes: action.payload, error: null }
    case SET_ERROR:
      return { ...state, error: action.payload }
    default:
      return state;
  }
}