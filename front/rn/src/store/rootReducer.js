import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { loginReducer } from '../screens/login/reducers'
import { homeReducer } from '../screens/home/reducers'
import { lastShiftLogReducer } from '../screens/lastShiftLog/reducers'
import { checklistReducer } from '../screens/checklist/reducers'
import { issuesReducer } from '../screens/report/reducers'
import { toolsReducer } from '../screens/toolList/reducers'
import { kpisProfileReducer } from '../screens/profile/reducers'
import { forumCommentsReducer } from '../screens/failure/reducers'
import { productionReducer } from "../screens/production/reducers";
import { processParameterReducer } from "../screens/processParameter/reducers";
import { qualityInspectionReducer } from "../screens/qualityInspection/reducers";
import { outsReducer } from "../screens/tryout/reducers";


const config = {
    key: 'primary',
    storage
}

const reducers = combineReducers({
  session: loginReducer,
  userMachine: homeReducer,
  lastShift: lastShiftLogReducer,
  checklist: checklistReducer,
  issues: issuesReducer,
  tools: toolsReducer,
  kpis: kpisProfileReducer,
  forumComments: forumCommentsReducer,
  production: productionReducer,
  processParameter: processParameterReducer,
  qualityInspection: qualityInspectionReducer,
  tryout: outsReducer,
});

export { reducers }