import {
  CHEKLIST_ANSWERS_SAVED,
  DISPLAY_CHECKLIST_ERROR,
  SET_INITIAL_CHECKLIST,
  CLEAR_CHECKLIST_ANSWERS,
  SET_SAFETY_DEVICES_CHECKLIST,  
  SET_CURRENT_CHECK,
  SET_EXTERNAL_CHECKLIST,
  SET_NEXT_TOOL,
  SET_TOOL_PARAMS,
  SET_CURRENT_PROD,
} from "../../store/actionTypes";

const initialState = {
    shift: null,
    answersSaved: false,
    initialChecklist: null,
    safetyDevicesChecklist: null,
    externalChecklist: null,
    currentCheck: 0,
    nextTool: null,
    toolParams: null,
    currentProd: null,
}

export function getChecklistSections(state) {
    const { initialChecklist } = state.checklist
    return initialChecklist != null ? initialChecklist.sections : []
}

export function getExternalChecklistSections(state) {
    const { externalChecklist } = state.checklist
    return externalChecklist != null ? externalChecklist : []
}

export function getSafetyChecklistItems(state) {
    const { safetyDevicesChecklist } = state.checklist
    if (safetyDevicesChecklist == null || safetyDevicesChecklist.sections.length == 0) return []
    return safetyDevicesChecklist.sections[0].checks
}

export function getCurrentCheck(state) {
    return state.checklist.currentCheck
}

export function getSafetyChecklistId(state) {
    const { safetyDevicesChecklist } = state.checklist
    return safetyDevicesChecklist != null ? safetyDevicesChecklist.id : -1
}

export function checklistReducer(state = initialState, action) {
    switch (action.type) {
      case CHEKLIST_ANSWERS_SAVED:
        return { ...state, shift: action.payload.shift, answersSaved: action.payload.answersSaved };
      case SET_INITIAL_CHECKLIST:
        return { ...state, initialChecklist: action.payload, error: null };
      case SET_EXTERNAL_CHECKLIST:
        return { ...state, externalChecklist: action.payload, error: null };
      case SET_SAFETY_DEVICES_CHECKLIST:
        return { ...state, safetyDevicesChecklist: action.payload, error: null };
      case SET_CURRENT_CHECK:
        return { ...state, currentCheck: action.payload };
      case SET_NEXT_TOOL:
        return { ...state, nextTool: action.payload };
      case SET_TOOL_PARAMS:
        return { ...state, toolParams: action.payload };
      case SET_CURRENT_PROD:
        return { ...state, currentProd: action.payload };
      case DISPLAY_CHECKLIST_ERROR:
        return { ...state, error: action.payload };
      case CLEAR_CHECKLIST_ANSWERS:
        return { ...state, ...initialState };
      default:
        return state;
    }
}
