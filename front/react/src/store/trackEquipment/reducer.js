import {  SET_LASTEST_SENSOR_LOG, SET_LASTEST_VALUES_BY_SENSOR, SET_ERROR } from "./types";
  
const initialState = {
    arrSensors: [],
    arrLastestValuesBySensor: []
};

export function trackEquipmentReducer(state = initialState, action) {
    switch (action.type) {
        case SET_LASTEST_SENSOR_LOG:
            return { ...state, arrSensors: action.payload, error: null }      
        case SET_LASTEST_VALUES_BY_SENSOR:
            return { ...state, arrLastestValuesBySensor: action.payload, error: null }      
        case SET_ERROR:
            return { ...state, error: action.payload }
        default:
            return state;
    }
}