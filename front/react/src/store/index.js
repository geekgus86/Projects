import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { userReducer } from "./user/reducer";
import { trackEquipmentReducer } from "./trackEquipment/reducer";

import { dailyReportReducer } from "./dailyReport/reducer";
import { kpisReducer } from "./kpi/reducer";
import { prodControlReducer } from "./controlBoard/reducer";
import { commentsReducer } from './comments/reducer'

const loggerMiddleware = createLogger();

const enhancer = compose(
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  )
);

const reducers = combineReducers({
  user: userReducer,
  trackEquipment: trackEquipmentReducer,
  dailyReport: dailyReportReducer,
  kpis: kpisReducer,
  prodControl: prodControlReducer,
  comments: commentsReducer
});

const store = createStore(
  reducers,
  enhancer
);

export { store }