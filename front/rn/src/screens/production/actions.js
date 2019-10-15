import Network from "../../lib/Network";
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

export function prepareProduction() {
  return async (dispatch, getState) => {
    try {
      const response = await Network.get('/dailyreport/prepareProduction');
      dispatch(productionPrepared(response.data));
    } catch (error) {
      dispatch(setProductionError(error));
    }
  }
}

export function editProduction(id) {
  return async (dispatch, getState) => {
    try {
      const response = await Network.post('/dailyreport/editValidatedProduction', { id: id})
      dispatch(productionPrepared(response.data));
    } catch (error) {
      dispatch(setProductionError(error));
    }
  }
}

export function getValidatedProduction() {
  return async (dispatch, getState) => {
    try {
      const response = await Network.get('/dailyreport/getValidatedProduction');
      if (response.success === true) {
        dispatch(productionValidated(response.data));
      }
    } catch (error) {
      dispatch(setProductionError(error));
    }
  }
}

export function getVerifiedProduction() {
  return async (dispatch, getState) => {
    try {
      const response = await Network.get('/dailyreport/getVerifiedProduction');
      if (response.success === true) {
        dispatch(productionVerified(response.data));
      }
    } catch (error) {
      dispatch(setProductionError(error));
    }
  }
}

export function validateProduction(production, status) {
  return async (dispatch, getState) => {
    try {
      if(status){
        status=true
      }else{
        status=false
      }
      const response = await Network.post('/dailyreport/validateProduction', { production_id: production.ID, setup_status: status, report_id: production.WorkOrderDetailID });
      if (response.success === true) {
        dispatch(productionValidated(response.data));
      }
    } catch (error) {
      dispatch(setProductionError(error));
    }
  }
}

export function verfifyProduction(id, params) {
  return async (dispatch, getState) => {
    try {
      const response = await Network.post('/dailyreport/verifyProduction', { 
        production: id,
        data: params
      });
      if (response.success === true) {
        dispatch(productionVerified(response.data));
      }
    } catch (error) {
      dispatch(setProductionError(error));
    }
  }
}

export function fetchProduction(id) {
  return async (dispatch, getState) => {
    try {
      const response = await Network.post("/dailyreport/getProduction", { production: id });
      if (response.success === true) {
        dispatch(setLastProduction(response.data));
      }
    } catch (error) {
      dispatch(setProductionError(error));
    }
  };
}

export function fetchDailyReportLog(day) {
  return async (dispatch, getState) => {
    try {
      const response = await Network.post("/dailyreport/getLog", { day: day });
      if (response.success === true) {
        dispatch(setDailyReportLog(response));
      }
    } catch (error) {
      dispatch(setProductionError(error));
    }
  };
}

export function updateCurrentTool(id, toolId) {
  return async (dispatch, getState) => {
    try {
      const response = await Network.post("/dailyreport/setCurrentTool", {
        production: id,
        tool: toolId
      });
      if (response.success === true) {
        dispatch(setProduction(response.data));
      }
    } catch (error) {
      dispatch(setProductionError(error));
    }
  };
}

export function closeProduction(id, params) {
  return async (dispatch, getState) => {
    try {
      const response = await Network.post("/dailyreport/closeProduction", {
        production: id, 
        data: params
      });

      if (response.success === true) {
        dispatch(productionClosed(true));
      }
    } catch (error) {
      dispatch(setProductionError(error));
    }
  };
}

export function updateChangeoverReqs(id, reqs) {
  return async (dispatch, getState) => {
    try {
      console.log(id, reqs)
      const response = await Network.post("/dailyreport/setChangeoverReqs", {
        production: id,
        reqs: reqs
      });
      if (response.success === true) {
        dispatch({
          type: CHECKLIST_VALIDATED
        })
      }
    } catch (error) {
      dispatch(setProductionError(error));
    }
  };
}

export function updateToolParams(id, params) {
  return async (dispatch, getState) => {
    try {      
      const response = await Network.post("/dailyreport/setToolsParams", {
        production: id,
        data: params
      });
      if (response.success === true) {
        dispatch(setProduction(response.data));
      }
    } catch (error) {
      dispatch(setProductionError(error));
    }
  };
}

export function setProductionError(data) {
  return {
    type: SET_PRODUCTION_ERROR,
    payload: data
  }
}

export function productionPrepared(data) {
  return {
    type: PRODUCTION_PREPARED,
    payload: data
  }
}

export function setChangeOver(data) {
  return {
    type: SET_CHANGEOVER,
    payload: data
  }
}

export function productionValidated(data) {
  return {
    type: PRODUCTION_VALIDATED,
    payload: data
  }
}

export function productionVerified(data) {
  return {
    type: PRODUCTION_VERIFIED,
    payload: data
  }
}

export function productionClosed(data) {
  return {
    type: PRODUCTION_CLOSED,
    payload: data
  }
}

export function setProduction(data) {
  return {
    type: SET_CURRENT_PRODUCTION,
    payload: data
  }
}

export function setLastProduction(data) {
  return {
    type: SET_LAST_PRODUCTION,
    payload: data
  }
}

export function setDailyReportLog(data) {
  return {
    type: SET_DAILY_REPORT_LOG,
    payload: data
  }
}

export function externalChecklistReady() {
  return {
    type: EXTERNAL_CHECKLIST_READY,
    payload: true
  }
}

export function toolInfoReady() {
  return {
    type: TOOL_INFO_READY,
    payload: true
  }
}