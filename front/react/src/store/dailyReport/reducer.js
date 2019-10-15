import { 
  SET_SHIFTS,
  SET_SHIFTS_STROKES,
  SET_DPR,
  SET_AREA_DOWNTIMES, 
  SET_ERROR, 
  SET_SUMMARY_STROKES, 
  SET_SECOND_SHIFT_DETAIL,
  SET_FIRST_SHIFT_DETAIL,
  SET_TOOL_REPORTS,
  SET_ROLLOS
} from "./types";

const initialState = {
  areaDowntimes: null,
  summary: null,
  dpr: null,
  firstShift: null,
  secondShift: null,
  firstShiftDetail: null,
  secondShiftDetail: null,
  reports: {},
  rollos: {},
  error: null
};

export function dailyReportReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SHIFTS:
      return { ...state, shifts: action.payload.data.shifts, error: null }
    case SET_SHIFTS_STROKES: 
      return { ...state, shiftsStrokes: action.payload, error: null }
    case SET_AREA_DOWNTIMES:
      return { ...state, areaDowntimes: action.payload, error: null }
    case SET_DPR:
        return { ...state, dpr: action.payload, error: null, reports: {} }
    case SET_SUMMARY_STROKES:
      return { ...state, summary: action.payload, error: null, reports: {} }
    case SET_FIRST_SHIFT_DETAIL:
      return { ...state, firstShiftDetail: action.payload, error: null }
    case SET_SECOND_SHIFT_DETAIL:
      return { ...state, secondShiftDetail: action.payload, error: null }
    case SET_TOOL_REPORTS:
      return {
        ...state,
        reports: {
          ...state.reports,
          [action.payload.tool]: action.payload.data
        },
        error: null
      }
    case SET_ROLLOS:
      return {
        ...state,
        rollos: {
          ...state.rollos,
          [action.payload.tool]: action.payload.data
        },
        error: null
      }
    case SET_ERROR:
      return { ...state, error: action.payload }
    default:
      return state;
  }
}
