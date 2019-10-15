import {
  EXTERNAL_CHECKLIST_READY,
  TOOL_INFO_READY,
  SET_PRODUCTION_ERROR,
  PRODUCTION_PREPARED,
  SET_CURRENT_PRODUCTION,
  PRODUCTION_CLOSED,
  SET_LAST_PRODUCTION,
  PRODUCTION_VALIDATED,
  PRODUCTION_VERIFIED,
  SET_DAILY_REPORT_LOG,
  CHECKLIST_VALIDATED
} from "../../store/actionTypes";

const initialState = {
  externalChecklist: false,  
  toolInformation: false,
  prepared: null,
  validated: null,
  last: null,
  error: null,
  closed: false,
  log: [],
  externalChecklistValues: null,
  checklistValidated: false
} 

export function getPreparedToolSpeed(state) {
  const { prepared } = state.production;
  if (prepared.tool !== null) {
    return prepared.tool.DesignSpeed;
  } else {
    return 0;
  }
}

export function getLastTool(state) {
  const { last } = state.production;
  if (last && last.tool !== null) {
    return last.tool.DescTool;
  } else {
    return "--";
  }
}

export function getValidatedTool(state) {
  const { validated } = state.production;
  if (validated && validated.hasOwnProperty('tool')) {
    if(validated.tool){
      return validated.tool.DescTool;
    }else{
      return "--"
    }
  } else {
    return "--";
  }
}

export function getPreparedTool(state) {
  const { prepared } = state.production;
  if (prepared && prepared.hasOwnProperty('tool')) {
    if(prepared.tool){
      return prepared.tool.DescTool;
    }else{
      return "--"
    }
  } else {
    return "--";
  }
}

export function getField(state, field, collection) {
  const object = state.production[collection];
  if (object !== null && typeof object !== 'undefined') {
    return object[field] ? object[field].toString() : "";
  }
  return "";
}

export function isReadyForChangeOver(state) {
  const { externalChecklist, toolInformation } = state.production;
  return externalChecklist === true && toolInformation === true;
}

export function productionReducer(state = initialState, action) {
  switch (action.type) {
    case PRODUCTION_PREPARED:
      return { ...state, prepared: action.payload, error: null };
    case PRODUCTION_VALIDATED:
      return { ...state, validated: action.payload, error: null };
    case PRODUCTION_VERIFIED:
      return { ...state, last: action.payload, error: null };
    case SET_CURRENT_PRODUCTION:
      return { ...state, prepared: action.payload, error: null };
    case SET_DAILY_REPORT_LOG:
      return { ...state, log: action.payload, error: null };
    case SET_LAST_PRODUCTION:
      return { ...state, last: action.payload, error: null };
    case PRODUCTION_CLOSED:
      return { ...state, closed: action.payload, error: null };
    case SET_PRODUCTION_ERROR:
      return { ...state, error: action.payload };
    case EXTERNAL_CHECKLIST_READY:
      return { ...state, externalChecklist: action.payload, error: null };
    case TOOL_INFO_READY:
      return { ...state, toolInformation: action.payload, error: null };
    case CHECKLIST_VALIDATED:
      return { ...state, checklistValidated: true, error: null };
    default:
      return state;
  }
}
