import api from "../../lib/api";
import { SET_LASTEST_SENSOR_LOG, SET_LASTEST_VALUES_BY_SENSOR, SET_ERROR } from "./types";

export function fetchLastestSensorLog(){
  return async (dispatch, getState) => {
    try {
        const response = await api.get("/sensor_value/get_sensors");
        dispatch({
          type: SET_LASTEST_SENSOR_LOG,
          payload: response
        });
    } catch (error) {
      dispatch(setError(error.error));
    }
  }
}

export function fetchLastestValuesBySensor(dataId){
  return async (dispatch, getState) => {
    try {
        const response = await api.get(`/sensor_value/get_values_log?id=${dataId}&l=30`);
        dispatch({
            type: SET_LASTEST_VALUES_BY_SENSOR,
            payload: response
        });
    } catch (error) {
      dispatch(setError(error.error));
    }
  }
}

export function setError(error) {
  return {
    type: SET_ERROR,
    payload: error
  }
}