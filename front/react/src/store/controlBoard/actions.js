import api from "../../lib/api";
import ls from "../../lib/localStorage";
import messages_en from "../../i18n/en.json"
import messages_es from "../../i18n/es.json"
import { SET_ERROR, SET_LAST_PRODUCTION_RECORD, SET_PRODUCTION, SET_OAPR, SET_REPORTS_OF_THE_DAY, SET_WEEK_PRODUCTION, SET_PROFILE, UPDATE_LAST_HOUR, SET_LAST_HOUR } from "./types";

export function networkStatus(){
  let resVal = 0
  var xhr = new XMLHttpRequest();
      var file = "https://sfms.metalsa.com/api/v1/versionapp";
  
      xhr.open('GET', file, true);
      xhr.send();
      
      xhr.addEventListener("readystatechange", processRequest, false);
  
      function processRequest(e) {
        if (xhr.readyState == 4) {
          if (xhr.status >= 200 && xhr.status < 304) {
            resVal = 1
            console.log("NETWORK STATUS : ","Connection exists!")
          } else {
            resVal = 0
            console.log("NETWORK STATUS : ","Connection doesn't exist!")
          }
        }
      }
    return resVal
}

export function fetchProduction(_day) {
  return async (dispatch, getState) => {
    try {
      const response = await api.post("/hourproduction/getInfoShift", {});
      if (response.success) {
        dispatch(setProduction(response.data));
        dispatch(setDsdOA(response.targetOa));
      }
    } catch (error) { 
      let resp = networkStatus()
      if(resp>0){     
        let jsonP = JSON.stringify(error.error)
        if(jsonP != '{}'){
          dispatch(setError(error.error));
        }else{
          if(ls.getItem('language') === "es"){
            dispatch(setError(messages_es['controlBoard.connection']));
          }else{
            dispatch(setError(messages_en['controlBoard.connection']));
          }
        }
      }  
    }
  }
}

export function fetchLastProductionRecord() {
  return async (dispatch, getState) => {
    try {
      const response = await api.get("/hourproduction/getLastRecordProduction");
      if (response.success) {
        dispatch(setLastProductionRecord(response.data));
      }
    } catch (error) {
      let resp = networkStatus()
      if(resp>0){     
        let jsonP = JSON.stringify(error.error)
        if(jsonP != '{}'){
          dispatch(setError(error.error));
        }else{
          if(ls.getItem('language') === "es"){
            dispatch(setError(messages_es['controlBoard.connection']));
          }else{
            dispatch(setError(messages_en['controlBoard.connection']));
          }
        }
      } 
    }
  }
}

export function fetchWeekProduction() {
  return async (dispatch, getState) => {
    try {
      const response = await api.get("/hourproduction/getWeekProduction");
      if (response.success) {
        dispatch(setWeekProduction(response.data));
      }
    } catch (error) {
      let resp = networkStatus()
      if(resp>0){     
        let jsonP = JSON.stringify(error.error)
        if(jsonP != '{}'){
          dispatch(setError(error.error));
        }else{
          if(ls.getItem('language') === "es"){
            dispatch(setError(messages_es['controlBoard.connection']));
          }else{
            dispatch(setError(messages_en['controlBoard.connection']));
          }
        }
      } 
    }
  }
}

export function fetchReportsOfTheDay() {
  return async (dispatch, getState) => {
    try {
      const response = await api.get("/hourproduction/getReportsOfTheDay");
      if (response.success) {
        dispatch(setReportsOfTheDay(response.data));
      }
    } catch (error) {
      let resp = networkStatus()
      if(resp>0){     
        let jsonP = JSON.stringify(error.error)
        if(jsonP != '{}'){
          dispatch(setError(error.error));
        }else{
          if(ls.getItem('language') === "es"){
            dispatch(setError(messages_es['controlBoard.connection']));
          }else{
            dispatch(setError(messages_en['controlBoard.connection']));
          }
        }
      } 
    }
  }
}

export function fetchProfile(_data) {
  return async (dispatch, getState) => {
    try {
      const response = await api.post("/user/profile");
      if (response.success) {
        dispatch(setProfile(response.data))
      }
    } catch (error) {
      let resp = networkStatus()
      if(resp>0){     
        let jsonP = JSON.stringify(error.error)
        if(jsonP != '{}'){
          dispatch(setError(error.error));
        }else{
          if(ls.getItem('language') === "es"){
            dispatch(setError(messages_es['controlBoard.connection']));
          }else{
            dispatch(setError(messages_en['controlBoard.connection']));
          }
        }
      } 
    }
  }
}

export function fetchLastHour(data) {
  return async (dispatch, getState) => {
    try {
      dispatch(setLastHourUpdate(data))
    } catch (error) {
      let resp = networkStatus()
      if(resp>0){     
        let jsonP = JSON.stringify(error.error)
        if(jsonP != '{}'){
          dispatch(setError(error.error));
        }else{
          if(ls.getItem('language') === "es"){
            dispatch(setError(messages_es['controlBoard.connection']));
          }else{
            dispatch(setError(messages_en['controlBoard.connection']));
          }
        }
      } 
    }
  }
}

export function updateLastHour(data) {
  return async (dispatch) => {
    try {
      ls.setItem('dsd.lastHour', JSON.stringify(data))
      dispatch(setLastHour(data))
    } catch (error) {
      let resp = networkStatus()
      if(resp>0){     
        let jsonP = JSON.stringify(error.error)
        if(jsonP != '{}'){
          dispatch(setError(error.error));
        }else{
          if(ls.getItem('language') === "es"){
            dispatch(setError(messages_es['controlBoard.connection']));
          }else{
            dispatch(setError(messages_en['controlBoard.connection']));
          }
        }
      } 
    }
  }
}

export function setProduction(data) {
  return {
    type: SET_PRODUCTION,
    payload: data
  }
}

export function setDsdOA(data) {
  return {
    type: SET_OAPR,
    payload: data
  }
}

export function setLastProductionRecord(data) {
  return {
    type: SET_LAST_PRODUCTION_RECORD,
    payload: data
  }
}

export function setWeekProduction(data) {
  return {
    type: SET_WEEK_PRODUCTION,
    payload: data
  }
}

export function setReportsOfTheDay(data) {
  return {
    type: SET_REPORTS_OF_THE_DAY,
    payload: data
  }
}

export function setProfile(data) {
  return {
    type: SET_PROFILE,
    payload: data
  }
}

export function setError(error) {
  return {
    type: SET_ERROR,
    payload: error
  }
}

export function setLastHourUpdate(data) {
  return {
    type: UPDATE_LAST_HOUR,
    payload: data
  }
}

export function setLastHour(data) {
  return {
    type: SET_LAST_HOUR,
    payload: data
  }
}